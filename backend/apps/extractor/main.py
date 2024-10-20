from extractor.extract_multiple_ollama import (
    extract as extract_multiple_ollama,
)
import torch

import gc
import os
import time
import shutil
import json

# os.environ["PYTORCH_CUDA_ALLOC_CONF"] = (
#     "garbage_collection_threshold:0.6,max_split_size_mb:128"
# )
# os.environ["PYTORCH_CUDA_ALLOC_CONF"] = "garbage_collection_threshold:0.6,backend:cudaMallocAsync"

# parameters = json.load(open("parameters.json"))


def get_or_list(values):
    if not isinstance(values, list):
        return [values]
    return values


def extraction_final_path(dir, model_name, size, overlap, k):
    parameters_section = f"chunk_s{size}-o{overlap}_top_k{k}"
    results_file_name = f"RESULTADOS_{model_name}__{parameters_section}.xlsx"
    return dir + results_file_name


def extract(schema):
    parameters_schema = schema.get("form").get("parameters")
    variables = schema.get("form").get("variables")
    annotation = schema.get("annotation")

    models = get_or_list(parameters_schema["model"])
    embedders = get_or_list(parameters_schema["embeddings"]["bert_model"])
    vector_stores = get_or_list(parameters_schema["embeddings"]["vector_db"])

    chunk_sizes = get_or_list(parameters_schema["embeddings"]["chunk_size"])
    chunk_overlap = get_or_list(parameters_schema["embeddings"]["chunk_overlap"])
    chain_types = get_or_list(parameters_schema["retrieval"]["chain_type"])
    top_k = get_or_list(parameters_schema["retrieval"]["top_k"])

    parameters = parameters_schema.copy()

    directory = "outputs/"

    start = time.time()
    counter = 0

    for model in models:
        parameters["model"] = model
        directory += f"{model}/"
        for bert_model in embedders:
            parameters["embeddings"]["bert_model"] = bert_model
            directory += f"{bert_model}/"
            for vector_store in vector_stores:
                parameters["embeddings"]["vector_db"] = vector_store
                directory += f"{vector_store}/"
                for chain_type in chain_types:
                    parameters["retrieval"]["chain_type"] = chain_type
                    directory += f"{chain_type}/"
                    for k in top_k:
                        parameters["retrieval"]["top_k"] = int(k)
                        directory += f"{k}/"
                        for size in chunk_sizes:
                            parameters["embeddings"]["chunk_size"] = int(size)
                            for overlap in chunk_overlap:
                                parameters["embeddings"]["chunk_overlap"] = int(overlap)
                                # if (k * size) > 3500:
                                #     continue

                                if os.path.isfile(
                                    extraction_final_path(
                                        directory, model, size, overlap, k
                                    )
                                ):
                                    print(
                                        "Configuração já gerou resultado. Carregado próximo cenário..."
                                    )
                                    continue

                                # if overlap > size:
                                #     print(
                                #         "Chunk overlap maior que chunk size. Carregado próximo cenário..."
                                #     )
                                #     continue

                                counter += 1
                                print(
                                    extraction_final_path(
                                        directory, model, size, overlap, k
                                    )
                                )
                                extract_multiple_ollama(
                                    parameters, variables, annotation, directory
                                )

                                # shutil.rmtree(path="embeddings/", ignore_errors=True)
                                # os.makedirs(os.path.dirname("embeddings/"), exist_ok=True)
                        directory = directory.replace(f"{k}/", "")
                    directory = directory.replace(f"{chain_type}/", "")
                directory = directory.replace(f"{vector_store}/", "")
            directory = directory.replace(f"{bert_model}/", "")
        directory = directory.replace(f"{model}/", "")

    end = time.time() - start
    print(f"{counter} cenário de testes executados em {end} segundos.")

    # Emptying embeddings folder
    # shutil.rmtree(path="embeddings/", ignore_errors=True)
    # os.makedirs(os.path.dirname("embeddings/"), exist_ok=True)


if __name__ == "__main__":
    schema = {
        "form": {
            "parameters": {
                "model": ["llama3.2"],
                "embeddings": {
                    "bert_model": ["bert-large-portuguese-cased"],
                    "chunk_size": ["512"],
                    "chunk_overlap": ["20"],
                    "embedding_model": ["HuggingFaceBgeEmbeddings"],
                    "vector_db": ["Chroma"],
                    "text_splitter": ["RecursiveCharacterTextSplitter"],
                },
                "retrieval": {
                    "chain_type": ["stuff"],
                    "top_k": ["3"],
                    "device_map": {"device": "cuda:0"},
                },
            },
            "variables": [
                {
                    "name": "Author Names",
                    "prompt": "Qual o modalidade do edital citado no documento? RESPONDA APENAS O NOME DA MODALIDADE.",
                    "label": None,
                },
                {
                    "name": "Author Names 2",
                    "prompt": "Qual é a comarca citada no documento? RESPONDA APENAS O NOME DA COMARCA.",
                    "label": None,
                },
            ],
        },
        "annotation": {"Author Names": {"244241.pdf": ""}},
    }
    extract(schema)
