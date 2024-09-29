from pydantic import BaseModel, FilePath
from typing import List, Optional


class Variable(BaseModel):
    name: str
    prompt: Optional[str] = None
    label: Optional[str] = None


class Embeddings(BaseModel):
    bert_model: List[str]
    chunk_size: List[str]
    chunk_overlap: List[str]
    embedding_model: List[str]
    vector_db: List[str]
    text_splitter: List[str]


class Retrieval(BaseModel):
    chain_type: List[str]
    top_k: List[str]
    device_map: dict


class ParametersFormData(BaseModel):
    model: List[str]
    embeddings: Embeddings
    retrieval: Retrieval


class FormSchema(BaseModel):
    """
    Represents the parameters for the extraction
    """

    parameters: ParametersFormData
    variables: List[Variable]

    class Config:
        from_attributes = True
