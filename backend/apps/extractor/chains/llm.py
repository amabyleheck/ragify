from chains.custom_chains import DynamicRetrievalQA, DynamicRetriever

from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
import transformers
import torch
import gc
from langchain.llms.huggingface_pipeline import HuggingFacePipeline

from langchain.prompts import PromptTemplate
from langchain_core.vectorstores import VectorStoreRetriever


class LocalLLM:
    def __init__(self, model_path, device_map={"device": "cuda:0"}) -> None:
        """
        Carrega um modelo de linguagem local e armazena-o em self.llm
        """

        tokenizer = AutoTokenizer.from_pretrained(model_path)

        # 8 BIT QUANTIZATION
        quantization_config = BitsAndBytesConfig(
            load_in_8bit=True, llm_int8_threshold=200.0
        )
        # 4 BIT QUANTIZATION
        # quantization_config = BitsAndBytesConfig(load_in_4bit=True, llm_int8_threshold=200.0)

        model = AutoModelForCausalLM.from_pretrained(
            model_path,
            device_map=device_map.get("device"),
            torch_dtype=torch.float16,
            use_auth_token=True,
            quantization_config=quantization_config,
        )

        pipeline = transformers.pipeline(
            "text-generation",
            model=model,
            max_new_tokens=100,
            tokenizer=tokenizer,
            device_map=device_map.get("device"),
            eos_token_id=tokenizer.eos_token_id,
            return_full_text=False,  # to not repeat the question, set to False
        )

        self.llm = HuggingFacePipeline(pipeline=pipeline)

    def __del__(self) -> None:
        """Clear the GPU memory used by the model, and remove the model itself."""
        try:
            del self.llm
        except AttributeError:
            pass
        del self
        gc.collect()
        torch.cuda.empty_cache()

    def get_pipeline(self):
        return self.llm

    def create_retrieval_qa_chain(
        self, db: VectorStoreRetriever, chain_type="stuff", prompt_template=None
    ):
        """
        Instancia uma chain DynamicRetrivalQA, que recebe um DynamicVectorRetriever
        (devido ao suporte descontinuado para RetrievalQA e chains relacionadas (map reduce, etc))
        """

        # O uso de dos tokens [/INST] é um token especial utilizado em prompts de modelos de linguagem do tipo Instruct.
        template = (
            """
        [INST]Você é um assistente de IA útil e fornece a resposta em língua portuguesa para a pergunta com base no contexto fornecido.
        Use os seguintes pedaços de contexto para responder a pergunta ao final. Se não for possível responder a pergunta a partir do contexto, apenas responda que você encontrou a resposta.
        CONTEXTO: {context}
        >>>PERGUNTA<<<: {question}[/INST]
        >>>RESPOSTA<<<:
        """
            if not prompt_template
            else prompt_template
        )

        prompt = PromptTemplate(
            template=template, input_variables=["context", "question"]
        )

        chain_type_kwargs = None
        if chain_type == "stuff":
            chain_type_kwargs = {"prompt": prompt}

        qa_chain = DynamicRetrievalQA.from_chain_type(
            llm=self.llm,
            chain_type=chain_type,
            chain_type_kwargs=chain_type_kwargs,
            retriever=DynamicRetriever(vectorstore=db),
            return_source_documents=True,
        )

        if not chain_type == "stuff":
            qa_chain.combine_documents_chain.llm_chain.prompt.template = prompt

        return qa_chain

    @staticmethod
    def get_model_kwargs(chain_type, model_name, top_k):
        return {
            "model_name": model_name,
            "quantization": "8bit",
            "top_k": top_k,
            "chain_type": chain_type,
        }
