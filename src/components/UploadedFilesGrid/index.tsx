import { DeleteRounded } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import UploadedFileRow from "./UploadedFileRow";
import PanelBox from "../PanelBox";

interface UploadedFilesGridProps {
  files: File[];
}

const UploadedFilesGrid: React.FC<UploadedFilesGridProps> = ({ files }) => {
  const [rows, setRows] = useState(files);

  function handleDeleteFile(name: string) {
    // TODO: Add are you sure alert
    setRows(
      rows &&
        rows.filter(row => {
          row.name !== name;
        })
    );
  }

  return (
    <PanelBox height={30}>
      <Stack direction={"column"}>
        {!!files && (
          <Typography variant="subtitle1" fontWeight={400}>
            No uploaded files yet.
          </Typography>
        )}
        {files &&
          files.map((file, index) => (
            <UploadedFileRow
              index={index}
              file={file}
              handleDeleteFile={handleDeleteFile}
            />
          ))}
      </Stack>
    </PanelBox>
  );
};

export default UploadedFilesGrid;
