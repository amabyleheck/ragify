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
