import { DeleteRounded } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import UploadedFileRow from "./UploadedFileRow";
import PanelBox from "../PanelBox";
import { FormContext } from "@/contexts/form";

const UploadedFilesGrid: React.FC = () => {
  const {
    formData: { files },
    setFiles
  } = useContext(FormContext);

  function handleDeleteFile(name: string) {
    // TODO: Add are you sure alert
    setFiles(
      files.filter(files => {
        files.name !== name;
      })
    );
  }

  return (
    <PanelBox height={20} className="overflow-y-scroll">
      <Stack direction={"column"} className="w-full">
        {files.length === 0 ? (
          <Typography variant="subtitle1" fontWeight={400}>
            No uploaded files yet.
          </Typography>
        ) : (
          files.map((file, index) => (
            <UploadedFileRow
              key={index}
              index={index}
              file={file}
              handleDeleteFile={handleDeleteFile}
            />
          ))
        )}
      </Stack>
    </PanelBox>
  );
};

export default UploadedFilesGrid;
