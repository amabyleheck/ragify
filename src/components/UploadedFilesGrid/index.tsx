import { Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
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
    const updatedFiles = files.filter(files => {
      return files.name !== name;
    });

    setFiles(updatedFiles);
    // TODO: Add success alert (notistack)
  }

  return (
    <PanelBox height={20} className="overflow-y-auto">
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
