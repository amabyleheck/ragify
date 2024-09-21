interface Prompts {
  key: string;
  question: string;
  type: string;
}

interface Embeddings {
  bert_model: string | string[];
  chunk_size: number | number[];
  chunk_overlap: number | number[];
  embedding_model: string | string[];
  vector_db: string | string[];
  text_splitter: string | string[];
}

interface Retrieval {
  chain_type: string | string[];
  top_k: number | number[];
  device_map: {
    device: string;
  };
}

export interface ParametersFormData {
  prompts: Prompts[];
  model: string | string[];
  embeddings: Embeddings;
  retrieval: Retrieval;
}

export const PARAMETER_OPTIONS = {
  // MODELS
  MODEL: ["llama-2-7b", "llama-2-13b", "Mistral-7b"], // TODO: Add lazy fetch of locally downloaded models
  // CHUNKING
  CHUNK_SIZE: ["128", "256", "512", "1024", "2048"],
  CHUNK_OVERLAP: ["20", "50", "100", "200", "300"],
  // EMBEDDINGS
  VECTOR_DATABASE: ["Chroma"],
  BERT_MODEL: ["bert-large-portuguese-cased"],
  EMBEDDING_MODEL: ["HuggingFaceBgeEmbeddings"], // TODO: Add lazy fetch from LangChain repo
  TEXT_SPLITTER: ["RecursiveCharacterSplitter"], // TODO: Add lazy fetch from LangChain repo
  // RETRIEVAL
  CHAIN_TYPE: ["stuff"],
  TOP_K: ["1", "3", "5", "10", "12"]
};
