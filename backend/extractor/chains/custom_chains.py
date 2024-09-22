from typing import Dict, List, Any, Optional
from typing_extensions import override
import inspect

from langchain.chains.retrieval_qa.base import RetrievalQA
from langchain.callbacks.manager import CallbackManagerForChainRun, AsyncCallbackManagerForChainRun, CallbackManagerForRetrieverRun, AsyncCallbackManagerForRetrieverRun

from langchain_core.documents import Document
from langchain_core.vectorstores import VectorStoreRetriever

"""
Custom classes inspired by AguirreNicolas provided on this issue https://github.com/langchain-ai/langchain/issues/10031
"""

class DynamicRetrievalQA(RetrievalQA):
    search_kwargs_key: str = "search_kwargs"

    @override
    def _call(
        self,
        inputs: Dict[str, Any],
        run_manager: Optional[CallbackManagerForChainRun] = None,
    ) -> Dict[str, Any]:
        """Run get_relevant_text and llm on input query.

        If chain has 'return_source_documents' as 'True', returns
        the retrieved documents as well under the key 'source_documents'.

        Example:
        .. code-block:: python

        res = indexqa({'query': 'This is my query'})
        answer, docs = res['result'], res['source_documents']
        """
        _run_manager = run_manager or CallbackManagerForChainRun.get_noop_manager()
        question = inputs[self.input_key]
        accepts_run_manager = (
            "run_manager" in inspect.signature(self._get_docs).parameters
        )
        if accepts_run_manager:
            docs = self._get_docs(inputs, run_manager=_run_manager)
        else:
            docs = self._get_docs(inputs)  # type: ignore[call-arg]
        answer = self.combine_documents_chain.run(
            input_documents=docs, question=question, callbacks=_run_manager.get_child()
        )

        if self.return_source_documents:
            return {self.output_key: answer, "source_documents": docs}
        else:
            return {self.output_key: answer}

    @override
    def _get_docs(
        self, inputs: Dict[str, Any], *, run_manager: CallbackManagerForChainRun
    ) -> List[Document]:
        question = inputs[self.input_key]
        search_kwargs = inputs[self.search_kwargs_key]
        return self.retriever.get_relevant_documents(
            question, callbacks=run_manager.get_child(), **search_kwargs
        )

    @override
    async def _aget_docs(
        self, inputs: Dict[str, Any], *, run_manager: AsyncCallbackManagerForChainRun
    ) -> List[Document]:
        question = inputs[self.input_key]
        search_kwargs = inputs[self.search_kwargs_key]        
        return await self.retriever.aget_relevant_documents(
            question, callbacks=run_manager.get_child(), **search_kwargs
        )


class DynamicRetriever(VectorStoreRetriever):

    @override
    def _get_relevant_documents(
        self, query: str, *, run_manager: CallbackManagerForRetrieverRun, **search_kwargs: Any,
    ) -> List[Document]:
        if self.search_type == "similarity":
            docs = self.vectorstore.similarity_search(query, **search_kwargs)
        elif self.search_type == "similarity_score_threshold":
            docs_and_similarities = (
                self.vectorstore.similarity_search_with_relevance_scores(
                    query, **search_kwargs
                )
            )
            docs = [doc for doc, _ in docs_and_similarities]
        elif self.search_type == "mmr":
            docs = self.vectorstore.max_marginal_relevance_search(
                query, **search_kwargs
            )
        else:
            raise ValueError(f"search_type of {self.search_type} not allowed.")
        return docs

    @override
    async def _aget_relevant_documents(
        self, query: str, *, run_manager: AsyncCallbackManagerForRetrieverRun,  **search_kwargs: Any,
    ) -> List[Document]:
        if self.search_type == "similarity":
            docs = await self.vectorstore.asimilarity_search(
                query, **search_kwargs
            )
        elif self.search_type == "similarity_score_threshold":
            docs_and_similarities = (
                await self.vectorstore.asimilarity_search_with_relevance_scores(
                    query, **search_kwargs
                )
            )
            docs = [doc for doc, _ in docs_and_similarities]
        elif self.search_type == "mmr":
            docs = await self.vectorstore.amax_marginal_relevance_search(
                query, **search_kwargs
            )
        else:
            raise ValueError(f"search_type of {self.search_type} not allowed.")
        return docs 
