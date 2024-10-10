from extract_multiple import extract
import torch

import gc
import os
import time
import shutil
import json

os.environ["PYTORCH_CUDA_ALLOC_CONF"] = (
    "garbage_collection_threshold:0.6,max_split_size_mb:128"
)
# os.environ["PYTORCH_CUDA_ALLOC_CONF"] = "garbage_collection_threshold:0.6,backend:cudaMallocAsync"

# variables = json.load(open("variables.json"))


def get_or_list(values):
    if not isinstance(values, list):
        return [values]
    return values


def extraction_final_path(dir, model_name, size, overlap, k):
    variables_section = f"chunk_s{size}-o{overlap}_top_k{k}"
    results_file_name = f"RESULTADOS_{model_name}__{variables_section}.xlsx"
    return dir + results_file_name


def main(variables):
    models = get_or_list(variables["model"])
    embedders = get_or_list(variables["embeddings"]["bert_model"])
    vector_stores = get_or_list(variables["embeddings"]["vector_db"])

    chunk_sizes = get_or_list(variables["embeddings"]["chunk_size"])
    chunk_overlap = get_or_list(variables["embeddings"]["chunk_overlap"])
    chain_types = get_or_list(variables["retrieval"]["chain_type"])
    top_k = get_or_list(variables["retrieval"]["top_k"])

    directory = "outputs/"

    start = time.time()
    counter = 0

    for model in models:
        variables["model"] = model
        directory += f"{model}/"
        for bert_model in embedders:
            variables["embeddings"]["bert_model"] = bert_model
            directory += f"{bert_model}/"
            for vector_store in vector_stores:
                variables["embeddings"]["vector_db"] = vector_store
                directory += f"{vector_store}/"
                for chain_type in chain_types:
                    variables["retrieval"]["chain_type"] = chain_type
                    directory += f"{chain_type}/"
                    for k in top_k:
                        variables["retrieval"]["top_k"] = k
                        directory += f"{k}/"
                        for size in chunk_sizes:
                            variables["embeddings"]["chunk_size"] = size
                            for overlap in chunk_overlap:
                                variables["embeddings"]["chunk_overlap"] = overlap
                                if (k * size) > 3500:
                                    continue

                                if os.path.isfile(
                                    extraction_final_path(
                                        directory, model, size, overlap, k
                                    )
                                ):
                                    print(
                                        "Configuração já gerou resultado. Carregado próximo cenário..."
                                    )
                                    continue

                                if overlap > size:
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
                                extract(variables, directory=directory)
                                gc.collect()
                                torch.cuda.empty_cache()

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
    main()
