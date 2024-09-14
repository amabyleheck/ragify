import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import UploadedFilesGrid from "@/components/UploadedFilesGrid";

const FilesList: React.FC = () => {
  return (
    <Stack spacing={1}>
      <Typography variant="h5" fontWeight={800} align="left" fontSize={20}>
        List of documents
      </Typography>
      <UploadedFilesGrid />
    </Stack>
  );
};

export default FilesList;
