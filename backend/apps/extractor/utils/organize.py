import os
import pandas as pd
from dotenv import load_dotenv
from openpyxl import load_workbook

load_dotenv()

ABS_PATH = os.getenv("ABS_PATH")


def extract_data_from_xlsx(file_path):
    """Extract specified data from the given xlsx file."""
    wb = load_workbook(filename=file_path, data_only=True)

    # Extracting data from the "Especificações" sheet
    specs = wb["Especificações"]
    nome = specs["A4"].value
    quantizacao = specs["B4"].value
    tamanho_chunk = specs["C4"].value
    tamanho_chunk_overlap = specs["D4"].value
    modelo_bert = specs["E4"].value
    estrategia_splitting = specs["F4"].value
    banco_vetores = specs["G4"].value
    chain_type = specs["H4"].value
    top_k = specs["I4"].value

    # Extracting data from the "Resultado" sheet
    resultado_sheet = wb["Resultado"]
    variavel = resultado_sheet["A4"].value
    resultado = resultado_sheet["B4"].value
    acuracia_maxima = resultado_sheet["D4"].value

    return [
        nome,
        quantizacao,
        tamanho_chunk,
        tamanho_chunk_overlap,
        modelo_bert,
        estrategia_splitting,
        banco_vetores,
        chain_type,
        top_k,
        variavel,
        resultado,
        acuracia_maxima,
    ]


def process_files_in_folder(folder_path):
    """Process all xlsx files in the folder and subfolders."""
    csv_rows = []
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.endswith(".xlsx"):
                full_path = os.path.join(root, file)
                csv_rows.append(extract_data_from_xlsx(full_path))

    # Create a DataFrame and save it as a CSV file
    columns = [
        "Name",
        "Quantization",
        "Chunk Size",
        "Chunk Overlap Size",
        "BERT Model",
        "Splitting Strategy",
        "Vector Database",
        "Chain type",
        "Top k",
        "Variável",
        "Resultado",
        "Acurácia Máxima",
    ]
    df = pd.DataFrame(csv_rows, columns=columns)
    df.to_excel(f"{ABS_PATH}/results/result_summary.xlsx", index=False)


def organize_results():
    process_files_in_folder(f"{ABS_PATH}/outputs/")
