import os
from typing import List

from dotenv import load_dotenv
from fastapi import UploadFile

import shutil
import aiofiles


load_dotenv()

ABS_PATH = os.getenv("ABS_PATH")
DOCUMENTS_DIR = os.getenv("DOCUMENTS_DIR")


async def bufferize_uploaded_files(uploaded_files: List[UploadFile]):
    """
    Save a list of uploaded files to a local folder.

    :param uploaded_files: List of uploaded file objects
    :param destination_folder: Path to the destination folder
    """

    for uploaded_file in uploaded_files:
        file_path = os.path.join(DOCUMENTS_DIR, uploaded_file.filename)
        print(file_path)

        file_content = await uploaded_file.read()
        async with aiofiles.open(file_path, "wb") as f:
            await f.write(file_content)


def clean_up_uploaded_files():
    if os.path.exists(DOCUMENTS_DIR):
        shutil.rmtree(DOCUMENTS_DIR)
    os.makedirs(DOCUMENTS_DIR)


def clean_up_outputs():
    outputs_dir = ABS_PATH + "/outputs/"
    results_dir = ABS_PATH + "/results/"
    final_results_dir = ABS_PATH + "/final/"

    for dir in [outputs_dir, results_dir, final_results_dir]:
        if os.path.exists(dir):
            shutil.rmtree(dir)
            os.makedirs(dir)


def zip_output_and_results():
    outputs_dir = ABS_PATH + "/outputs/"
    results_dir = ABS_PATH + "/results/"

    final_results_dir = ABS_PATH + "/final/"

    zip_file_path_results = os.path.join(ABS_PATH, "final", "results")

    zip_file_path_summary = os.path.join(ABS_PATH, "final", "summary")
    zip_file_path_outputs = os.path.join(ABS_PATH, "final", "outputs")

    shutil.make_archive(zip_file_path_summary, "zip", results_dir)
    shutil.make_archive(zip_file_path_outputs, "zip", outputs_dir)

    shutil.make_archive(zip_file_path_results, "zip", final_results_dir)
