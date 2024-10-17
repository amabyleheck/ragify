import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext } from "react";
import UploadedFilesGrid from "@/components/Grids/UploadedFilesGrid";
import { FormContext } from "@/contexts/form";

interface FilesListProps {
  annotation: boolean;
}

const FilesList: React.FC<FilesListProps> = ({ annotation }) => {
  const {
    formData: { files }
  } = useContext(FormContext);

  return (
    <Stack spacing={1}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography variant="h5" fontWeight={800} align="left" fontSize={20}>
          List of documents
        </Typography>
        <Typography
          variant="body1"
          fontWeight={500}
          align="right"
          fontSize={15}
        >
          Total: {files.length}
        </Typography>
      </Stack>
      <UploadedFilesGrid annotation={annotation} />
    </Stack>
  );
};

export default FilesList;
