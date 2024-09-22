from extract_multiple import extract
from utils.utils import get_extraction_final_path, get_or_list
import torch

import gc
import os
import time
import shutil


def main():
    models = get_or_list(variables["model"])
    embedders = get_or_list(variables["embeddings"]["bert_model"])
    vector_stores = get_or_list(variables["embeddings"]["vector_db"])

    chunk_sizes = get_or_list(variables["embeddings"]["chunk_size"])
    chunk_overlap = get_or_list(variables["embeddings"]["chunk_overlap"])
    chain_types = get_or_list(variables["retrieval"]["chain_type"])
    top_k = get_or_list(variables["retrieval"]["top_k"])

    directory = 'outputs/'

    start = time.time()
    counter = 0
    
    for model in models:
        variables["model"] = model
        directory += f'{model}/'
        for bert_model in embedders:
            variables["embeddings"]["bert_model"] = bert_model
            directory += f'{bert_model}/'
            for vector_store in vector_stores:
                variables["embeddings"]["vector_db"] = vector_store
                directory += f'{vector_store}/'
                for chain_type in chain_types:
                    variables["retrieval"]["chain_type"] = chain_type
                    directory += f'{chain_type}/'
                    for k in top_k:
                        variables["retrieval"]["top_k"] = k
                        directory += f'{k}/'
                        for size in chunk_sizes:
                            variables["embeddings"]["chunk_size"] = size
                            for overlap in chunk_overlap:
                                variables["embeddings"]["chunk_overlap"] = overlap

                                if overlap >= size:
                                    print("Tamanho de chunk overlap não pode ser maior ou igual que chunk size. Carregando próximo cenário...")
                                    continue

                                if (k*size) > 3000:
                                    print("Quantidade de tokens carregada no contexto não pode superar 3000. Carregando próximo cenário...")
                                    continue

                                if os.path.isfile(get_extraction_final_path(directory, model, size, overlap, k)):
                                    print("Configuração já gerou resultado. Carregando próximo cenário...")
                                    continue

                                extract(variables, directory=directory)
                                counter += 1
                                gc.collect()
                                torch.cuda.empty_cache()
                                
                                # Emptying embeddings folder
                                shutil.rmtree(path="embeddings/", ignore_errors=True)
                                os.makedirs(os.path.dirname("embeddings/"), exist_ok=True)

                        directory = directory.replace(f'{k}/', '')       
                    directory = directory.replace(f'{chain_type}/', '')
                directory = directory.replace(f'{vector_store}/', '')
            directory = directory.replace(f'{bert_model}/', '')
        directory = directory.replace(f'{model}/', '')

    end = time.time() - start
    print(f"{counter} cenário de testes executados em {end} segundos.")


if __name__ == '__main__':
    main()
