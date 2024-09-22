import os
import shutil
import time
import importlib

from typing import List

from langchain_community.document_loaders import PyPDFDirectoryLoader, PyPDFLoader
from langchain_community.embeddings import HuggingFaceBgeEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores.chroma import Chroma
from transformers import AutoTokenizer

from langchain_core.documents import Document

ABS_PATH: str = os.path.dirname(os.path.abspath(__file__))
DOCUMENTS_DIR = f'{ABS_PATH}/documentos/'

SENTENCE_TRANSFORMER_MODELS_DIR = os.path.expanduser('~/modelos/sentence-transformer-models')

class LocalVectorStoreGenerator:
    """
    Carrega documentos baseado em uma lista de IDs fornecida por parâmetro, transforma-os em splits e cria embeddings,
    armazenando-os em um vector strore
    """
    DEFAULT_CHUNK_SIZE = 512
    DEFAULT_CHUNK_OVERLAP = 300

    DEFAULT_VECTOR_DB = Chroma
    DEFAULT_SPLITTER = RecursiveCharacterTextSplitter
    DEFAULT_EMBEDDING_MODEL = HuggingFaceBgeEmbeddings
    DEFAULT_BERT_MODEL = "bert-large-portuguese-cased"
    
    def __init__(self, 
                 documents_ids: List[int] = None, 
                 single_file: bool = False, 
                 file_path: str = None,
                 **kwargs) -> None:
        
        if not single_file:
            self.set_up_documents_dir(documents_ids=documents_ids)

        # REGION: Loading kwargs and variables
        self.vector_db_class = self.load_vector_db(kwargs.get('vector_db'))
        self.splitter = self.load_text_splitter(kwargs.get('text_splitter'))
        self.embedding_model = self.load_embedding_model(kwargs.get("embedding_model"))

        self.bert_model = kwargs.get('bert_model') or self.DEFAULT_BERT_MODEL
        self.chunk_size = kwargs.get('chunk_size') or self.DEFAULT_CHUNK_SIZE
        self.chunk_overlap = kwargs.get('chunk_overlap') or self.DEFAULT_CHUNK_OVERLAP
        model_kwargs = kwargs.get('model_kwargs') or {'device': 'cuda:0'}
        
        self.bert_model_dir = f'{SENTENCE_TRANSFORMER_MODELS_DIR}/{self.bert_model}'
        # ENDREGION
        
        chunks = self.split_documents(single_file=single_file, file_path=file_path)
        self.vector_database = self.create_embeddings(chunks, model_kwargs)

    def load_embedding_model(self, embedding_model):
        if not embedding_model:
            return self.DEFAULT_EMBEDDING_MODEL
        
        module = importlib.import_module('langchain_community.embeddings')
        embedding_model_class = getattr(module, embedding_model)

        return embedding_model_class
    
    def load_vector_db(self, vector_db):
        if not vector_db:
            return self.DEFAULT_VECTOR_DB
        
        module = importlib.import_module(f'langchain_community.vectorstores.{vector_db.lower()}')
        vector_db_class = getattr(module, vector_db)

        return vector_db_class
    
    def load_text_splitter(self, text_splitter):
        if not text_splitter:
            return self.DEFAULT_SPLITTER
        
        module = importlib.import_module('langchain.text_splitter')
        text_splitter_class = getattr(module, text_splitter)

        return text_splitter_class

    def create_embeddings(self, chunks, model_kwargs):
        start = time.time()

        encode_kwargs = {'normalize_embeddings': False}

        embedding_function = self.embedding_model(
            model_name=self.bert_model_dir,
            model_kwargs=model_kwargs,
            encode_kwargs=encode_kwargs
        )

        # Se já existir banco de vetores com determinada configuração, não recria-o
        if os.path.isdir(self.DB_DIR):
            shutil.rmtree(path=self.DB_DIR, ignore_errors=True)
#             vector_database = self.vector_db_class(
#                 persist_directory=self.DB_DIR,
#                 embedding_function=embedding_function
#             )
#             print("Retrieving existing db...")

#         else:
        vector_database = self.vector_db_class.from_documents(
            documents=chunks,
            embedding=embedding_function,
            persist_directory=self.DB_DIR
        )

        end = time.time()
        
        print(f"Creating embeddings for {len(chunks)} chunks took {end - start} seconds!\n")

        return vector_database

    def split_documents(self, single_file: bool = False, file_path: str = None) -> List[Document]:
        # if os.path.isdir(self.DB_DIR):
        #     print("Skipping splitting since db already exists...")
        #     return []
        tokenizer_bert = AutoTokenizer.from_pretrained(self.bert_model_dir)
        len_function = lambda x: len(tokenizer_bert.tokenize(x))

        text_splitter = self.splitter(
            chunk_size = self.chunk_size,
            chunk_overlap  = self.chunk_overlap,
            length_function = len_function,
            add_start_index = True,
        )

        documents = []

        start = time.time()

        if single_file:
            documents = PyPDFLoader(file_path=file_path).load()
        else:
            documents = PyPDFDirectoryLoader(DOCUMENTS_DIR).load()

        chunks = text_splitter.split_documents(documents)

        end = time.time()

        print(f"Loading and splitting {len(documents)} documents into {len(chunks)} took {end - start} seconds!\n")

        return chunks

    def get_vector_store(self):
        return self.vector_database
    
    def persist(self):
        self.vector_database.persist()
    
    @property
    def DB_DIR(self):
        options_str = f'{self.bert_model}__s{self.chunk_size}-o{self.chunk_overlap}'
        return f'embeddings/{self.vector_db_class.__name__}_db_{options_str}/'

    def set_up_documents_dir(self, documents_ids: List[int], recreate_dir = True):
        """
        Copia cada documento referenciado por seu ID no arquivo importado no diretório `documentos`
        """

        # Remoção de diretório caso já exista
        if recreate_dir:
            shutil.rmtree(path=f'{DOCUMENTS_DIR}', ignore_errors=True)

        os.makedirs(os.path.dirname(DOCUMENTS_DIR), exist_ok=True)

        ids_string = set([f'{id}.pdf' for id in documents_ids])
    
        for entry in os.scandir(path='documentos-pdf'):
            if entry.name in ids_string:
                shutil.copy(entry, DOCUMENTS_DIR)


    def get_embedding_kwargs(self):
        kwargs = {
            'chunk_size': self.chunk_size,
            'chunk_overlap': self.chunk_overlap,
            'bert_model': self.bert_model,
            'splitter': self.splitter.__name__,
            'embedding_model': self.embedding_model.__name__,
            'vector_db_class': self.vector_db_class.__name__
        }

        return kwargs
