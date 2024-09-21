import React from "react";
import { TextField, Typography, Stack } from "@mui/material";
import { Box } from "@mui/system";
import MultiSelect from "@/components/MultiSelect";
import { PARAMETER_OPTIONS } from "@/types/Parameters";

const ParametersForm: React.FC = () => {
  return (
    <Stack direction="column" spacing={1} alignItems={"flex-start"}>
      <Typography variant="subtitle1" fontWeight={800}>
        Models
      </Typography>

      <Box>
        <MultiSelect
          title="LLM"
          values={PARAMETER_OPTIONS.MODEL}
          onChange={() => {}}
        />
      </Box>

      {/* Embeddings Section */}
      <Typography variant="subtitle1" fontWeight={800}>
        Embeddings
      </Typography>

      <Stack spacing={2}>
        <Stack spacing={2} direction={"row"}>
          <MultiSelect
            title="Chunk Size"
            values={PARAMETER_OPTIONS.CHUNK_SIZE}
            onChange={() => {}}
          />
          <MultiSelect
            title="Chunk Overlap"
            values={PARAMETER_OPTIONS.CHUNK_OVERLAP}
            onChange={() => {}}
          />
        </Stack>
        <Stack spacing={2} direction={"row"}>
          <MultiSelect
            title="Vector Database"
            values={PARAMETER_OPTIONS.VECTOR_DATABASE}
            onChange={() => {}}
          />
          <MultiSelect
            title="Embedding Model"
            values={PARAMETER_OPTIONS.EMBEDDING_MODEL}
            onChange={() => {}}
          />
        </Stack>
        <Stack spacing={2} direction={"row"}>
          <MultiSelect
            title="Bert Model"
            values={PARAMETER_OPTIONS.BERT_MODEL}
            onChange={() => {}}
          />
          <MultiSelect
            title="Text Splitter"
            values={PARAMETER_OPTIONS.TEXT_SPLITTER}
            onChange={() => {}}
          />
        </Stack>
      </Stack>

      {/* Retrieval Section */}
      <Typography variant="subtitle1" fontWeight={800}>
        Retrieval
      </Typography>

      <Stack spacing={2}>
        <Stack spacing={2} direction={"row"}>
          <MultiSelect
            title="Top K"
            values={PARAMETER_OPTIONS.TOP_K}
            onChange={() => {}}
          />
          <TextField label="Device Map (CUDA)" />
        </Stack>
        <Box className="flex">
          <MultiSelect
            title="Chain Type"
            values={PARAMETER_OPTIONS.CHAIN_TYPE}
            onChange={() => {}}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default ParametersForm;
