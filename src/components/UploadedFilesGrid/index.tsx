import { Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import UploadedFileRow from "@/components/UploadedFilesGrid/UploadedFileRow";
import PanelBox from "@/components/PanelBox";
import { FormContext } from "@/contexts/form";
// import { TabContext } from "@/contexts/tab";
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

  // const { activeTab } = useContext(TabContext);
  const { enqueueSnackbar } = useSnackbar();

  function handleDeleteFile(name: string) {
    // TODO: Add are you sure alert
    const updatedFiles = files.filter(files => {
      return files.name !== name;
    });

    setFiles(updatedFiles);
    enqueueSnackbar("File deleted successfully.", { variant: "success" });
  }

  return (
    <PanelBox height={annotation ? 45 : 20} className="overflow-y-auto">
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
              annotation={annotation}
            />
          ))
        )}
      </Stack>
    </PanelBox>
  );
};

export default UploadedFilesGrid;
