interface Prompts {
  key: string;
  question: string;
}

interface Embeddings {
  bert_model: string;
  chunk_size: number;
  chunk_overlap: number;
  embedding_model: string;
  vector_db: string;
  text_splitter: string;
}

interface Retrieval {
  chain_type: string;
  top_k: number;
  device_map: {
    device: string;
  };
}

interface ParametersFormData {
  prompts: Prompts[];
  model: string;
  embeddings: Embeddings;
  retrieval: Retrieval;
}
