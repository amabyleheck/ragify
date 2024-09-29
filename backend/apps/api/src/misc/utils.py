import os


def bufferize_uploaded_files(uploaded_files):
    """
    Save a list of uploaded files to a local folder.

    :param uploaded_files: List of uploaded file objects
    :param destination_folder: Path to the destination folder
    """
    destination_folder = os.path.join(
        os.path.dirname(__file__), "..", "..", "..", "extractor", "documentos-pdf"
    )

    for uploaded_file in uploaded_files:
        file_path = os.path.join(destination_folder, uploaded_file.filename)
        with open(file_path, "wb") as f:
            f.write(uploaded_file.read())
