import os
import pandas as pd
from openpyxl import load_workbook

def extract_data_from_xlsx(file_path):
    """Extract specified data from the given xlsx file."""
    wb = load_workbook(filename=file_path, data_only=True)
    
    # Extracting data from the "Especificações" sheet
    specs = wb['Especificações']
    nome = specs['A4'].value
    quantizacao = specs['B4'].value
    tamanho_chunk = specs['C4'].value
    tamanho_chunk_overlap = specs['D4'].value
    modelo_bert = specs['E4'].value
    estrategia_splitting = specs['F4'].value
    banco_vetores = specs['G4'].value
    chain_type = specs['H4'].value
    top_k = specs['I4'].value

    # Extracting data from the "Resultado" sheet
    resultado_sheet = wb['Resultado']
    id_prompt = resultado_sheet['A4'].value
    resultado = resultado_sheet['B4'].value
    acuracia_maxima = resultado_sheet['D4'].value

    return [nome, quantizacao, tamanho_chunk, tamanho_chunk_overlap, modelo_bert, 
            estrategia_splitting, banco_vetores, chain_type, top_k, id_prompt, 
            resultado, acuracia_maxima]

def process_files_in_folder(folder_path):
    """Process all xlsx files in the folder and subfolders."""
    csv_rows = []
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.endswith('.xlsx'):
                full_path = os.path.join(root, file)
                csv_rows.append(extract_data_from_xlsx(full_path))

    # Create a DataFrame and save it as a CSV file
    columns = ["Name", "Quantization", "Chunk Size", "Chunk Overlap Size", 
               "BERT Model", "Splitting Strategy", "Vector Database", 
               "Chain type", "Top k", "ID Prompt", "Resultado", "Acurácia Máxima"]
    df = pd.DataFrame(csv_rows, columns=columns)
    df.to_csv('result_summary__municipio.csv', index=False)
    df.to_excel('result_summary__municipio.xlsx', index=False)

# Path to the 'result' folder
process_files_in_folder('outputs/')