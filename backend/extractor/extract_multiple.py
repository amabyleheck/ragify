import time
from pathlib import Path
import os

from utils.utils import get_local_model_dir, get_variable_form
import torch

from importer.importer import ExcelImportParser
from exporter.exporter import ExcelResultsExport

from ingest import LocalVectorStoreGenerator
from chains.llm import LocalLLM

import json

ABS_PATH: str = os.path.dirname(os.path.abspath(__file__))

MODELS_PATH = os.path.expanduser('~/modelos/')
DOCUMENTS_DIR = f'{ABS_PATH}/documentos'

def extract(variables=None, directory=''):
    """Função principal a ser chamada para criação de embeddings e chamada de rotina de extração e geração de csv de resultados

    Args:
        variables (Dict, optional): Conjunto de variáveis necessárias para extração. Para mais informações, 
        leia a seção "Ajustando os parâmetros" na documentação.
        directory (str, optional): Diretório a ser salvo determinado conjunto de testes. Defaults to ''.
    """

    if not variables:
        with open(f"{ABS_PATH}/variables.json") as f:
            variables = json.load(f)
    
    model_name = variables.get("model")
    prompts = variables.get("prompts")
    retrieval_kwargs = variables.get("retrieval")
    embedding_kwargs = variables.get("embeddings")

    arquivo_entrada = ExcelImportParser() 

    documents_ids = arquivo_entrada.get_ids_documentos()
    nome_coluna = arquivo_entrada.get_column_name()
    nome_variavel = get_variable_form(nome_coluna)

    # GENERATING EMBEDDINGS AND LOCAL VECTOR STORE REGION
    vectorstore_generator = LocalVectorStoreGenerator(documents_ids=documents_ids, **embedding_kwargs)
    vector_store = vectorstore_generator.get_vector_store()
    # ENDREGION

    # LOADING LOCAL MODEL REGION
    model_path = get_local_model_dir(MODELS_PATH, model_name)
    device_map = retrieval_kwargs.get("device_map")

    llm = LocalLLM(model_path=model_path, device_map=device_map)
    
    print(f"{model_name} MODEL LOADED!")
    # ENDREGION

    # EXTRACTION REGION
    top_k = retrieval_kwargs.get("top_k") or 3
    chain_type = retrieval_kwargs.get("chain_type") or "stuff"

    annotated_dict = arquivo_entrada.get_annotated_dict()
    extracted_dict = {}
    for prompt_dict in prompts:
        prompt_key, prompt = prompt_dict.values()

        with torch.no_grad(): # useful for inference, reduce escaling memory consumption
            extracted_dict[prompt_key] = {}

            # Extraction routine
            start = time.time()

            qa_chain = llm.create_retrieval_qa_chain(
                db=vector_store,
                chain_type=chain_type
            )
            
            counter = 0
            for id in documents_ids:
                source = f'{DOCUMENTS_DIR}/{id}.pdf'

                response = qa_chain({
                    'query': prompt, 
                    'search_kwargs':{'k': top_k, "filter": {"source": source}}
                })

                value = response.get('result')
                docs = response.get('source_documents')

                extracted_dict[prompt_key][id] = {
                    'value': value,
                    'docs': docs
                }
                counter += 1
                print(f"Answer for document {id}: {value}")
                print(f"{counter} documents parsed.")

            end = time.time()
            print(f"Extracting {len(documents_ids)} documents with {model_name} took {end - start} seconds!\n")

    del llm
    # ENDREGION

    # RESULTS KWARGS REGION
    model_kwargs = LocalLLM.get_model_kwargs(
        model_name=model_name, 
        chain_type=chain_type,
        top_k=top_k
    )
    
    embedding_kwargs = vectorstore_generator.get_embedding_kwargs()
    # ENDREGION

    # EXTRACTION RESULT CALL
    ExcelResultsExport(
        annotated_dict=annotated_dict,
        extracted_dict=extracted_dict,
        model_name=model_name,
        prompts=prompts,
        header_name=nome_coluna,
        variable_name=nome_variavel
    ).export(
        model_kwargs=model_kwargs,
        embedding_kwargs=embedding_kwargs,
        directory=directory
    )
    

if __name__ == '__main__':
    extract()
