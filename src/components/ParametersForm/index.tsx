import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Grid2 } from "@mui/material";
import { ParametersFormData } from "@/types/Parameters";

const initialFormData: ParametersFormData = {
  prompts: [],
  model: "",
  embeddings: {
    bert_model: "bert-large-portuguese-cased",
    chunk_size: 512,
    chunk_overlap: 300,
    embedding_model: "HuggingFaceBgeEmbeddings",
    vector_db: "Chroma",
    text_splitter: "RecursiveCharacterTextSplitter"
  },
  retrieval: {
    chain_type: "stuff",
    top_k: 3,
    device_map: {
      device: "cuda:0"
    }
  }
};

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState<ParametersFormData>(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePromptsChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newPrompts = [...formData.prompts];
    newPrompts[index] = { ...newPrompts[index], [name]: value };
    setFormData({ ...formData, prompts: newPrompts });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission here
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={2}>
          {/* Model Field */}
          <Grid2>
            <TextField
              label="Model"
              name="model"
              value={formData.model}
              onChange={() => handleChange}
              fullWidth
            />
          </Grid2>

          {/* Prompts Fields */}
          {formData.prompts.map((prompt, index) => (
            <React.Fragment key={index}>
              <Grid2>
                <TextField
                  label="Prompt Key"
                  name="key"
                  value={prompt.key}
                  onChange={e => handlePromptsChange(index, e)}
                  fullWidth
                />
              </Grid2>
              <Grid2>
                <TextField
                  label="Question"
                  name="question"
                  value={prompt.question}
                  onChange={e => handlePromptsChange(index, e)}
                  fullWidth
                />
              </Grid2>
            </React.Fragment>
          ))}

          {/* Embeddings Fields */}
          <Grid2>
            <Typography variant="h6" gutterBottom>
              Embeddings
            </Typography>
          </Grid2>
          <Grid2>
            <TextField
              label="BERT Model"
              name="bert_model"
              value={formData.embeddings.bert_model}
              onChange={() => handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2>
            <TextField
              label="Chunk Size"
              name="chunk_size"
              type="number"
              value={formData.embeddings.chunk_size}
              onChange={() => handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2>
            <TextField
              label="Chunk Overlap"
              name="chunk_overlap"
              type="number"
              value={formData.embeddings.chunk_overlap}
              onChange={() => handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2>
            <TextField
              label="Embedding Model"
              name="embedding_model"
              value={formData.embeddings.embedding_model}
              onChange={() => handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2>
            <TextField
              label="Vector DB"
              name="vector_db"
              value={formData.embeddings.vector_db}
              onChange={() => handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2>
            <TextField
              label="Text Splitter"
              name="text_splitter"
              value={formData.embeddings.text_splitter}
              onChange={() => handleChange}
              fullWidth
            />
          </Grid2>

          {/* Retrieval Fields */}
          <Grid2>
            <Typography variant="h6" gutterBottom>
              Retrieval
            </Typography>
          </Grid2>
          <Grid2>
            <TextField
              label="Chain Type"
              name="chain_type"
              value={formData.retrieval.chain_type}
              onChange={() => handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2>
            <TextField
              label="Top K"
              name="top_k"
              type="number"
              value={formData.retrieval.top_k}
              onChange={() => handleChange}
              fullWidth
            />
          </Grid2>
          <Grid2>
            <TextField
              label="Device Map"
              name="device"
              value={formData.retrieval.device_map.device}
              onChange={e =>
                setFormData({
                  ...formData,
                  retrieval: {
                    ...formData.retrieval,
                    device_map: {
                      device: e.target.value
                    }
                  }
                })
              }
              fullWidth
            />
          </Grid2>
        </Grid2>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 16 }}
        >
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default FormComponent;
