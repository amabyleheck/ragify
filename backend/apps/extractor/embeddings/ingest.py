import os
import shutil
import time
import importlib

from typing import List

from dotenv import load_dotenv

from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_community.embeddings import HuggingFaceBgeEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores.chroma import Chroma

from transformers import AutoTokenizer

from langchain_core.documents import Document

load_dotenv()

ABS_PATH = os.getenv("ABS_PATH")
DOCUMENTS_DIR = os.getenv("DOCUMENTS_DIR")
SENTENCE_TRANSFORMER_MODELS_DIR = os.getenv("SENTENCE_TRANSFORMER_MODELS_DIR")


class LocalVectorStoreGenerator:
    """
    Carrega documentos baseado em uma lista de IDs fornecida por parâmetro, transforma-os em splits e cria embeddings,
    armazenando-os em um vector strore
    """

    DEFAULT_CHUNK_SIZE = 512
    DEFAULT_CHUNK_OVERLAP = 20

    DEFAULT_VECTOR_DB = Chroma
    DEFAULT_SPLITTER = RecursiveCharacterTextSplitter
    DEFAULT_EMBEDDING_MODEL = HuggingFaceBgeEmbeddings
    DEFAULT_BERT_MODEL = "bert-large-portuguese-cased"

    def __init__(
        self,
        **kwargs,
    ) -> None:

        # REGION: Loading kwargs and variables
        self.vector_db_class = self.load_vector_db(kwargs.get("vector_db"))
        self.splitter = self.load_text_splitter(kwargs.get("text_splitter")[0])
        self.embedding_model = self.load_embedding_model(
            kwargs.get("embedding_model")[0]
        )

        self.bert_model = kwargs.get("bert_model") or self.DEFAULT_BERT_MODEL
        self.chunk_size = kwargs.get("chunk_size") or self.DEFAULT_CHUNK_SIZE
        self.chunk_overlap = kwargs.get("chunk_overlap") or self.DEFAULT_CHUNK_OVERLAP
        model_kwargs = kwargs.get("model_kwargs") or {"device": "mps"}

        self.bert_model_dir = f"{SENTENCE_TRANSFORMER_MODELS_DIR}/{self.bert_model}"
        # ENDREGION

        # if os.path.isdir(self.DB_DIR):
        #     shutil.rmtree(path=self.DB_DIR, ignore_errors=True)

        chunks = self.split_documents()
        self.vector_database = self.create_embeddings(chunks, model_kwargs)

    def load_embedding_model(self, embedding_model):
        if not embedding_model:
            return self.DEFAULT_EMBEDDING_MODEL

        module = importlib.import_module("langchain_community.embeddings")
        embedding_model_class = getattr(module, embedding_model)

        return embedding_model_class

    def load_vector_db(self, vector_db):
        if not vector_db:
            return self.DEFAULT_VECTOR_DB

        module = importlib.import_module(
            f"langchain_community.vectorstores.{vector_db.lower()}"
        )
        vector_db_class = getattr(module, vector_db)

        return vector_db_class

    def load_text_splitter(self, text_splitter):
        if not text_splitter:
            return self.DEFAULT_SPLITTER

        module = importlib.import_module("langchain.text_splitter")
        text_splitter_class = getattr(module, text_splitter)

        return text_splitter_class

    def create_embeddings(self, chunks, model_kwargs):
        start = time.time()

        encode_kwargs = {"normalize_embeddings": False}

        embedding_function = self.embedding_model(
            model_name=self.bert_model_dir,
            model_kwargs=model_kwargs,
            encode_kwargs=encode_kwargs,
        )

        # Se já existir banco de vetores com determinada configuração, não recria-o
        if os.path.isdir(self.DB_DIR):
            vector_database = self.vector_db_class(
                persist_directory=self.DB_DIR, embedding_function=embedding_function
            )
            print("Retrieving existing db...")

        else:
            vector_database = self.vector_db_class.from_documents(
                documents=chunks,
                embedding=embedding_function,
                persist_directory=self.DB_DIR,
            )

        end = time.time()

        print(
            f"Creating embeddings for {len(chunks)} chunks took {end - start} seconds!\n"
        )

        return vector_database

    def split_documents(self) -> List[Document]:
        if os.path.isdir(self.DB_DIR):
            print("Skipping splitting since db already exists...")
            return []
        tokenizer_bert = AutoTokenizer.from_pretrained(self.bert_model_dir)
        len_function = lambda x: len(tokenizer_bert.tokenize(x))

        text_splitter = self.splitter(
            chunk_size=self.chunk_size,
            chunk_overlap=self.chunk_overlap,
            length_function=len_function,
            add_start_index=True,
        )

        documents = []

        start = time.time()

        documents = PyPDFDirectoryLoader(DOCUMENTS_DIR).load()

        chunks = text_splitter.split_documents(documents)

        end = time.time()

        print(
            f"Loading and splitting {len(documents)} documents into {len(chunks)} took {end - start} seconds!\n"
        )

        return chunks

    def get_vector_store(self):
        return self.vector_database

    def persist(self):
        self.vector_database.persist()

    @property
    def DB_DIR(self):
        options_str = f"{self.bert_model}__s{self.chunk_size}-o{self.chunk_overlap}"
        return (
            f"{ABS_PATH}/embeddings/{self.vector_db_class.__name__}_db_{options_str}/"
        )

    def get_embedding_kwargs(self):
        kwargs = {
            "chunk_size": self.chunk_size,
            "chunk_overlap": self.chunk_overlap,
            "bert_model": self.bert_model,
            "splitter": self.splitter.__name__,
            "embedding_model": self.embedding_model.__name__,
            "vector_db_class": self.vector_db_class.__name__,
        }

        return kwargs
