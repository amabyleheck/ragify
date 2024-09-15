import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import UploadedFilesGrid from "@/components/UploadedFilesGrid";

interface FilesListProps {
  annotation: boolean;
}

const FilesList: React.FC<FilesListProps> = ({ annotation }) => {
  return (
    <Stack spacing={1}>
      <Typography variant="h5" fontWeight={800} align="left" fontSize={20}>
        List of documents
      </Typography>
      <UploadedFilesGrid annotation={annotation} />
    </Stack>
  );
};

export default FilesList;
