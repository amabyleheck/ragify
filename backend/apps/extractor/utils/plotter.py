import os
import shutil

import matplotlib.ticker as mtick
import matplotlib.pyplot as plt
import numpy as np

from exporter.exporter import ExcelResultsExport
from utils.utils import get_extraction_variables, copy_file_to_dir

CHUNK_SIZES = [128, 256, 512, 1024, 2048]
CHUNK_OVERLAP = [20, 50, 100, 200, 300]
TOP_K = [1, 3, 5, 8, 10, 12]


def plot_graph(title: str, x_label: str, x_values, data):
    x_values = list(x_values)

    if len(data) == 0:
        raise Exception(
            "Não foi possível importar nenhum resultado. Você tem certeza que populou o diretório corretamente?"
        )

    x = np.array(x_values)
    y = np.array([i for i in range(0, 101, 10)])

    plt.style.use("ggplot")
    plt.figure(figsize=(10, 6))

    x_index = range(len(x))

    markers = ["o", "X", "v", "P", "^", "h", "D", "*"]

    for index, key in enumerate(data.keys()):
        accuracies = data[key]["accuracy"].values()
        retriever_accuracies = data[key]["retriever_accuracy"].values()
        plt.plot(x_index, accuracies, marker=markers[index], label=key)
    # Plotting maximum potential accuracies
    plt.plot(
        x_index,
        retriever_accuracies,
        marker=".",
        color="gray",
        linestyle=":",
        label="Acurácia Potencial",
    )

    # Formatting
    plt.title(title)
    plt.xlabel(x_label)
    plt.ylabel(
        "Acurácia"
    )  # Since all these graphs are compared to accuracy, this will be static
    plt.xticks(range(len(x)), x)
    plt.yticks(y)
    plt.grid(True)
    plt.legend()
    plt.tight_layout()

    # Adjust x-axis limits with padding
    padding = 0.05
    plt.xlim(x_index[0] - padding, x_index[-1] + padding)

    # Show plot
    plt.gca().yaxis.set_major_formatter(mtick.PercentFormatter(xmax=100.0))
    plt.show()


def generate_comparison_by_parameter(title, label, parameter, x_values, directory):
    """Gera gráfico de comparação de acurácia X qualquer parâmetro (coletado pelo arquivo de resultados de extração).
    É necessário criar um diretório separando todos os arquivos testados para esse cenário de teste específico

    Args:
        title (str): Título do gráfico a ser traçado
        directory (str): Legenda do parâmetro a ser analisado
        parameter (str): Parâmetro escolhido para análise
        directory (str): Diretório onde estarão armazenados os arquivos de resultados.
    """

    final_results_dict = {}

    for file in os.scandir(directory):
        length = len(file.name)
        if file.name[length - 5 :] == ".xlsx":
            file_results_dict = ExcelResultsExport.get_results_dict_from_export(file)

            model = file_results_dict["model"]
            accuracy = file_results_dict["accuracy"]
            retriever_accuracy = file_results_dict["retriever_accuracy"]
            parameter_value = file_results_dict[parameter]

            if not final_results_dict.get(model):
                final_results_dict[model] = {
                    "accuracy": {key: None for key in x_values},
                    "retriever_accuracy": {key: None for key in x_values},
                }

            # Avoid discrepancies in value types (ex.: A chunk size be imported '1024' on accident instead of 1024)
            if isinstance(x_values[0], int):
                final_results_dict[model]["accuracy"][int(parameter_value)] = accuracy
                final_results_dict[model]["retriever_accuracy"][
                    int(parameter_value)
                ] = retriever_accuracy
            else:
                final_results_dict[model]["accuracy"][parameter_value] = accuracy
                final_results_dict[model]["retriever_accuracy"][
                    parameter_value
                ] = retriever_accuracy

    # Sorting internal values on descending order (ex: instead of 2048, 1024... -> 256, 512,...)
    for key in final_results_dict.keys():
        current_dict = final_results_dict[key]["accuracy"]
        sorted_keys_desc = sorted(current_dict.keys(), reverse=False)
        sorted_dict = {key: current_dict[key] for key in sorted_keys_desc}

        final_results_dict[key][accuracy] = sorted_dict

        current_dict = final_results_dict[key]["retriever_accuracy"]
        sorted_keys_desc = sorted(current_dict.keys(), reverse=False)
        sorted_dict = {key: current_dict[key] for key in sorted_keys_desc}

        final_results_dict[key][retriever_accuracy] = sorted_dict

    # Sorting models names alphabetically
    sorted_keys_desc = sorted(final_results_dict.keys())
    final_results_dict = {key: final_results_dict[key] for key in sorted_keys_desc}

    plot_graph(title=title, x_label=label, x_values=x_values, data=final_results_dict)


def plot_chunk_sizes_graph(x_values=CHUNK_SIZES, directory="chunk_sizes/"):
    """Gera gráfico de comparação de chunk sizes.
    É necessário criar um diretório separando todos os arquivos testados para esse cenário de teste específico

    Args:
        directory (str, optional): Diretório onde estarão armazenados os arquivos de testes. Defaults 'chunk_sizes/'.
    """
    title = "Model accuracy comparison with different chunk sizes"
    label = "Chunk sizes"
    parameter = "chunk_size"

    generate_comparison_by_parameter(title, label, parameter, x_values, directory)


def plot_chunk_overlap_sizes_graph(x_values=CHUNK_OVERLAP, directory="chunk_overlap/"):
    """Gera gráfico de comparação de chunk sizes.
    É necessário criar um diretório separando todos os arquivos testados para esse cenário de teste específico

    Args:
        directory (str, optional): Diretório onde estarão armazenados os arquivos de testes. Defaults 'chunk_overlap/'.
    """
    title = "Model accuracy comparison with different chunk overlap sizes"
    label = "Chunk overlap sizes"
    parameter = "chunk_overlap"

    generate_comparison_by_parameter(title, label, parameter, x_values, directory)


def plot_top_ks_graph(
    title="Model accuracy comparison with different top k values",
    label="Top K",
    parameter="top_k",
    x_values=TOP_K,
    directory="top_k",
):
    """Gera gráfico de comparação de chunk sizes.
    É necessário criar um diretório separando todos os arquivos testados para esse cenário de teste específico

    Args:
        directory (str, optional): Diretório onde estarão armazenados os arquivos de testes. Defaults 'top_k/'.
    """

    generate_comparison_by_parameter(title, label, parameter, x_values, directory)


def set_up_results_dir(dir="outputs/"):
    for model in os.scandir(dir):
        for bert_model in os.scandir(model):
            for vector_store in os.scandir(bert_model):
                for chain_type in os.scandir(vector_store):
                    for k in os.scandir(chain_type):
                        for file in os.scandir(k):
                            print(file.name)
                            chunk_size, chunk_overlap, top_k = get_extraction_variables(
                                file.name
                            )
                            chunk_size_dir = (
                                f"results/chunk_sizes/{top_k}/{chunk_overlap}/"
                            )
                            chunk_overlap_dir = (
                                f"results/chunk_overlaps/{top_k}/{chunk_size}/"
                            )
                            top_k_dir = f"results/top_ks/{chunk_size}/{chunk_overlap}/"
                            copy_file_to_dir(file, chunk_size_dir)
                            copy_file_to_dir(file, chunk_overlap_dir)
                            copy_file_to_dir(file, top_k_dir)
