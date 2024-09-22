#from torch import cuda
import unicodedata
import sys

import datetime
import re
import os
import shutil

def get_timestamp_for_file():
    # Returns a string in the format YYYY-MM-DD__HH-mm-ss
    return str(datetime.datetime.now())[:19].replace(' ', '__').replace(':', '-')

def get_local_model_dir(dir: str, model_name: str):
    if 'llama' in model_name:
        return dir + f'llamaV2/{model_name}'
    return dir + model_name

def remove_accents(input_str: str) -> str:
    # Create a translation table mapping special characters to their normal counterparts
    translation_table = dict.fromkeys(
        i for i in range(sys.maxunicode)
        if unicodedata.category(chr(i)).startswith('P')
    )

    # Use the translation table to remove accents
    normalized_str = input_str.translate(translation_table)
    
    return normalized_str

def get_variable_form(variable_name: str) -> str:
    # INPUT: "Número do processo licitatório"
    # OUTPUT: "numero_do_processo_licitatorio"
    return remove_accents(variable_name.lower().replace(' ', '_'))


def get_or_list(values):
    if not isinstance(values, list):
        return [values]
    return values


def get_extraction_final_path(dir, model_name, size, overlap, k):
    return dir + get_extraction_file_name(model_name, size, overlap, k)


def get_extraction_file_name(model_name, size, overlap, k):
    variables_section = f'chunk_s{size}-o{overlap}_top_k{k}'
    results_file_name = f'RESULTADOS_{model_name}__{variables_section}.xlsx'
    return results_file_name


def get_extraction_variables(file_name):
    pattern = r'.*chunk_s(\d+)-o(\d+)_top_k(\d+)\.xlsx'
    match = re.match(pattern, file_name)
    if match:
        size = int(match.group(1))
        overlap = int(match.group(2))
        k = int(match.group(3))
        return size, overlap, k
    else:
        return None
    

def copy_file_to_dir(file, dir):
    try:
        shutil.copy(file, dir)
    except FileNotFoundError:
        os.makedirs(dir)
        shutil.copy(file, dir)