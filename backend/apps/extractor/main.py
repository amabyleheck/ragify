from dotenv import load_dotenv
from extractor.extract_multiple_ollama import (
    extract as extract_multiple_ollama,
)
import os
import time

from extractor.utils.organize import organize_results

load_dotenv()

ABS_PATH = os.getenv("ABS_PATH")


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

    directory = f"{ABS_PATH}/outputs/"

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

                                if os.path.isfile(
                                    extraction_final_path(
                                        directory, model, size, overlap, k
                                    )
                                ):
                                    print(
                                        "Configuração já gerou resultado. Carregado próximo cenário..."
                                    )
                                    continue

                                if int(overlap) > int(size):
                                    print(
                                        "Chunk overlap maior que chunk size. Carregado próximo cenário..."
                                    )
                                    continue

                                counter += 1
                                print(
                                    extraction_final_path(
                                        directory, model, size, overlap, k
                                    )
                                )
                                extract_multiple_ollama(
                                    parameters, variables, annotation, directory
                                )
                        directory = directory.replace(f"{k}/", "")
                    directory = directory.replace(f"{chain_type}/", "")
                directory = directory.replace(f"{vector_store}/", "")
            directory = directory.replace(f"{bert_model}/", "")
        directory = directory.replace(f"{model}/", "")

    end = time.time() - start
    print(f"{counter} cenário de testes executados em {end} segundos.")

    organize_results()
