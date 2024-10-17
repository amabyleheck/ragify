export interface Embeddings {
  bert_model: string[];
  chunk_size: string[];
  chunk_overlap: string[];
  embedding_model: string[];
  vector_db: string[];
  text_splitter: string[];
}

export interface Retrieval {
  chain_type: string[];
  top_k: string[];
  device_map: {
    device: string;
  };
}

export interface ParametersFormData {
  model: string[];
  embeddings: Embeddings;
  retrieval: Retrieval;
}

export const PARAMETER_OPTIONS = {
  // MODELS
  MODEL: [
    "llama-2-7b",
    "llama-2-13b",
    "Mistral-7b",
    "llama3.2",
    "llama3.1:70b"
  ], // TODO: Add lazy fetch of locally downloaded models
  // CHUNKING
  CHUNK_SIZE: ["128", "256", "512", "1024", "2048"],
  CHUNK_OVERLAP: ["20", "50", "100", "200", "300"],
  // EMBEDDINGS
  VECTOR_DATABASE: ["Chroma"],
  BERT_MODEL: ["bert-large-portuguese-cased"],
  EMBEDDING_MODEL: ["HuggingFaceBgeEmbeddings"], // TODO: Add lazy fetch from LangChain repo
  TEXT_SPLITTER: ["RecursiveCharacterTextSplitter"], // TODO: Add lazy fetch from LangChain repo
  // RETRIEVAL
  CHAIN_TYPE: ["stuff"],
  TOP_K: ["1", "3", "5", "10", "12"]
};
