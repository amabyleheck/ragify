import React from "react";
import { TextField, Typography, Stack, Divider } from "@mui/material";
import { Box } from "@mui/system";

const ParametersForm: React.FC = () => {
  return (
    <Stack direction="column" spacing={1} alignItems={"flex-start"}>
      <Typography variant="subtitle1" fontWeight={800}>
        Models
      </Typography>

      <Box>
        <TextField size="small" label="LLM" />
      </Box>

      {/* Embeddings Section */}
      <Typography variant="subtitle1" fontWeight={800}>
        Embeddings
      </Typography>

      <Stack spacing={2}>
        <Stack spacing={2} direction={"row"}>
          <TextField size="small" label="Chunk Size" />
          <TextField size="small" label="Chunk Overlap" />
        </Stack>
        <Stack spacing={2} direction={"row"}>
          <TextField size="small" label="Vector Database" />
          <TextField size="small" label="Embedding Model" />
        </Stack>
        <Stack spacing={2} direction={"row"}>
          <TextField size="small" label="Bert Model" />
          <TextField size="small" label="Text Splitter" />
        </Stack>
      </Stack>

      {/* Retrieval Section */}
      <Typography variant="subtitle1" fontWeight={800}>
        Retrieval
      </Typography>

      <Stack spacing={2}>
        <Stack spacing={2} direction={"row"}>
          <TextField size="small" label="Top K" />
          <TextField size="small" label="Device Map (CUDA)" />
        </Stack>
        <Box className="flex">
          <TextField size="small" label="Chain Type" />
        </Box>
      </Stack>
    </Stack>
  );
};

export default ParametersForm;
