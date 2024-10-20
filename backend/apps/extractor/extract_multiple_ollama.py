import time
from pathlib import Path
import os

from dotenv import load_dotenv

from extractor.embeddings.ingest import LocalVectorStoreGenerator
from extractor.chains.llm import LocalLLM
from extractor.exporter.exporter import ExcelResultsExport

load_dotenv()

DOCUMENTS_DIR = os.getenv("DOCUMENTS_DIR")


def extract(parameters: dict, variables: dict, annotation: dict, directory=""):
    """Função principal a ser chamada para criação de embeddings e chamada de rotina de extração e geração de csv de resultados

    Args:
        parameters (Dict, optional): Conjunto de variáveis necessárias para extração. Para mais informações,
        leia a seção "Ajustando os parâmetros" na documentação.
        directory (str, optional): Diretório a ser salvo determinado conjunto de testes. Defaults to ''.
    """
    documents_dir_path = Path(DOCUMENTS_DIR)
    documents_ids = [doc.stem for doc in documents_dir_path.glob("*.pdf")]

    model_name = parameters.get("model")
    retrieval_kwargs = parameters.get("retrieval")
    embedding_kwargs = parameters.get("embeddings")

    # GENERATING EMBEDDINGS AND LOCAL VECTOR STORE REGION
    vectorstore_generator = LocalVectorStoreGenerator(**embedding_kwargs)
    vector_store = vectorstore_generator.get_vector_store()
    # ENDREGION

    # LOADING LOCAL MODEL REGION
    llm = LocalLLM(model_path=model_name, local=False)

    print(f"{model_name} MODEL LOADED!")
    # ENDREGION

    # EXTRACTION REGION
    top_k = retrieval_kwargs.get("top_k") or 3
    chain_type = retrieval_kwargs.get("chain_type") or "stuff"

    extracted_dict = {}

    qa_chain = llm.create_retrieval_qa_chain(db=vector_store, chain_type=chain_type)

    for variable in variables:
        variable_name = variable.get("name")
        prompt = variable.get("prompt")

        extracted_dict[variable_name] = {}
        start = time.time()

        counter = 0
        # Extraction routine
        for id in documents_ids:
            source = f"{DOCUMENTS_DIR}/{id}.pdf"

            response = qa_chain(
                {
                    "query": prompt,
                    "search_kwargs": {"k": top_k, "filter": {"source": source}},
                }
            )

            value = response.get("result")
            docs = response.get("source_documents")

            extracted_dict[variable_name][id] = {"value": value, "docs": docs}
            counter += 1
            print(f"Answer for document {id}: {value}")
            print("-----------")
            print(f"{counter} documents parsed.")

            end = time.time()
        print(
            f"Extracting {len(documents_ids)} documents with {model_name} took {end - start} seconds!\n"
        )
        # ENDREGION

        # RESULTS KWARGS REGION
        model_kwargs = LocalLLM.get_model_kwargs(
            model_name=model_name, chain_type=chain_type, top_k=top_k
        )

        embedding_kwargs = vectorstore_generator.get_embedding_kwargs()
        # ENDREGION

        # EXTRACTION RESULT CALL REGION
        ExcelResultsExport(
            documents_ids=documents_ids,
            annotated_dict=annotation,
            extracted_dict=extracted_dict,
            model_name=model_name,
            variables=variables,
        ).export(
            model_kwargs=model_kwargs,
            embedding_kwargs=embedding_kwargs,
            directory=directory,
        )
        # ENDREGION
