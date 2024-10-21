import { Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import UploadedFileRow from "@/components/Grids/UploadedFilesGrid/UploadedFileRow";
import PanelBox from "@/components/PanelBox";
import { FormContext } from "@/contexts/form";
import { useSnackbar } from "notistack";

interface UploadedFilesGridProps {
  annotation: boolean;
}

const UploadedFilesGrid: React.FC<UploadedFilesGridProps> = ({
  annotation = false
}) => {
  const {
    formData: { files },
    setFiles
  } = useContext(FormContext);

  const { enqueueSnackbar } = useSnackbar();

  function handleDeleteFile(name: string) {
    // TODO: Add are you sure alert
    const updatedFiles = files.filter(files => {
      return files.name !== name;
    });

    setFiles(updatedFiles);
    enqueueSnackbar("Arquivo deletado com sucesso.", { variant: "success" });
  }

  return (
    <PanelBox height={annotation ? 45 : 30} className="overflow-y-auto">
      <Stack direction={"column"} className="w-full">
        {files.length === 0 ? (
          <Typography variant="subtitle1" fontWeight={400}>
            Nenhum documento carregado até o momento.
          </Typography>
        ) : (
          files.map((file, index) => (
            <UploadedFileRow
              key={index}
              index={index}
              file={file}
              handleDeleteFile={handleDeleteFile}
              annotation={annotation}
            />
          ))
        )}
      </Stack>
    </PanelBox>
  );
};

export default UploadedFilesGrid;
