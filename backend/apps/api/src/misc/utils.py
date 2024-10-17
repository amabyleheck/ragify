import os
from typing import List

from dotenv import load_dotenv
from fastapi import UploadFile

import shutil
import aiofiles


load_dotenv()

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
