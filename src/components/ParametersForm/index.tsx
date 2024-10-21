import React, { useContext } from "react";
import { TextField, Typography, Stack, SelectChangeEvent } from "@mui/material";
import { Box } from "@mui/system";
import MultiSelect from "@/components/MultiSelect";
import { Embeddings, PARAMETER_OPTIONS, Retrieval } from "@/types/Parameters";
import { FormContext } from "@/contexts/form";

const ParametersForm: React.FC = () => {
  const {
    formData: {
      parameters: {
        embeddings: {
          bert_model,
          chunk_overlap,
          chunk_size,
          embedding_model,
          text_splitter,
          vector_db
        },
        model,
        retrieval: { chain_type, device_map, top_k }
      }
    },
    setModelParameter,
    setEmbeddingKey,
    setRetrievalKey
  } = useContext(FormContext);

  const getUpdatedValue = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value }
    } = event;

    return typeof value === "string" ? value.split(",") : value;
  };

  const handleChangeModel = (event: SelectChangeEvent<string[]>) => {
    setModelParameter(getUpdatedValue(event));
  };

  const handleChangeDeviceMap = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRetrievalKey("device_map", { device: event.target.value });
  };

  const handleChangeEmbeddings = (
    event: SelectChangeEvent<string[]>,
    key: keyof Partial<Embeddings>
  ) => {
    setEmbeddingKey(key, getUpdatedValue(event));
  };

  const handleChangeRetrieval = (
    event: SelectChangeEvent<string[]>,
    key: keyof Partial<Retrieval>
  ) => {
    setRetrievalKey(key, getUpdatedValue(event));
  };

  return (
    <Stack direction="column" spacing={3} alignItems={"flex-start"}>
      <Typography variant="subtitle1" fontWeight={800}>
        Modelos
      </Typography>

      <Box>
        <MultiSelect
          title="LLM"
          values={PARAMETER_OPTIONS.MODEL}
          selectedValue={model}
          onChange={handleChangeModel}
        />
      </Box>

      {/* Embeddings Section */}
      <Typography variant="subtitle1" fontWeight={800}>
        Embeddings
      </Typography>

      <Stack spacing={2} direction={"column"}>
        <Stack spacing={2} direction={"row"}>
          <MultiSelect
            title="Tamanho de Chunk"
            values={PARAMETER_OPTIONS.CHUNK_SIZE}
            selectedValue={chunk_size}
            onChange={e => handleChangeEmbeddings(e, "chunk_size")}
          />
          <MultiSelect
            title="Tamanho de Chunk Overlap"
            values={PARAMETER_OPTIONS.CHUNK_OVERLAP}
            selectedValue={chunk_overlap}
            onChange={e => handleChangeEmbeddings(e, "chunk_overlap")}
          />
          <MultiSelect
            title="Text Splitter"
            values={PARAMETER_OPTIONS.TEXT_SPLITTER}
            selectedValue={text_splitter}
            onChange={e => handleChangeEmbeddings(e, "text_splitter")}
          />
        </Stack>
        <Stack spacing={2} direction={"row"}>
          <MultiSelect
            title="Banco de Vetores"
            values={PARAMETER_OPTIONS.VECTOR_DATABASE}
            selectedValue={vector_db}
            onChange={e => handleChangeEmbeddings(e, "vector_db")}
          />
          <MultiSelect
            title="Modelo BERT"
            values={PARAMETER_OPTIONS.BERT_MODEL}
            selectedValue={bert_model}
            onChange={e => handleChangeEmbeddings(e, "bert_model")}
          />
          <MultiSelect
            title="Modelo de Embeddings"
            values={PARAMETER_OPTIONS.EMBEDDING_MODEL}
            selectedValue={embedding_model}
            onChange={e => handleChangeEmbeddings(e, "embedding_model")}
          />
        </Stack>
      </Stack>

      {/* Retrieval Section */}
      <Typography variant="subtitle1" fontWeight={800}>
        Recuperação (retrieval)
      </Typography>

      <Stack spacing={2}>
        <Stack spacing={2} direction={"row"}>
          <MultiSelect
            title="Top K"
            values={PARAMETER_OPTIONS.TOP_K}
            selectedValue={top_k}
            onChange={e => handleChangeRetrieval(e, "top_k")}
          />
          <TextField
            label="Device Map"
            value={device_map.device}
            onChange={handleChangeDeviceMap}
          />
        </Stack>
        <Box className="flex">
          <MultiSelect
            title="Tipo de Chain"
            values={PARAMETER_OPTIONS.CHAIN_TYPE}
            selectedValue={chain_type}
            onChange={e => handleChangeRetrieval(e, "chain_type")}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default ParametersForm;
