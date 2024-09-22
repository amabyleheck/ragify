import { Button, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";
import CloudUploadIcon from "@mui/icons-material/FileUploadOutlined";
import HiddenInput from "@/components/DragAndDrop/HiddenInput";
import { FormContext } from "@/contexts/form";
import { useSnackbar } from "notistack";

const DragAndDrop: React.FC = () => {
  const {
    formData: { files },
    setFiles
  } = useContext(FormContext);

  const { enqueueSnackbar } = useSnackbar();

  const handleFileUpload = (uploadedFiles: File[] | null) => {
    if (!uploadedFiles || uploadedFiles.length === 0) return;

    if (
      uploadedFiles.length > 0 &&
      uploadedFiles.some(file => file.type !== "application/pdf")
    ) {
      enqueueSnackbar("Only .pdf documents are allowed", { variant: "error" });
      return;
    }

    if (
      uploadedFiles.some(file =>
        files.map(file => file.name).includes(file.name)
      )
    ) {
      enqueueSnackbar("Duplicate files are not allowed. Please try again.", {
        variant: "error"
      });
      return;
    }

    const filesArray = uploadedFiles.concat(files);
    setFiles(filesArray);
    enqueueSnackbar("Files uploaded successfully.", { variant: "success" });
  };

  const handleFileDrag = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const uploadedFiles =
      event.dataTransfer.files && Array.from(event.dataTransfer.files);
    handleFileUpload(uploadedFiles);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const uploadedFiles = event.target.files && Array.from(event.target.files);
    handleFileUpload(uploadedFiles);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5" fontWeight={800} align="left" fontSize={25}>
        Upload documents
      </Typography>
      <Button
        component="label"
        tabIndex={-1}
        sx={{
          margin: 0,
          padding: 0,
          ":hover": { borderRadius: "15px" }
        }}
        onDrop={e => handleFileDrag(e)}
        onDragOver={e => handleFileDrag(e)}
      >
        <Box className="rounded-border min-h-[20vh] min-w-full content-center border-2 border-dotted border-[#DBDBDB]">
          <CloudUploadIcon sx={{ fontSize: "10vh", color: "#EBEBEB" }} />
          <Typography
            variant="h5"
            fontWeight={800}
            align="center"
            fontSize={18}
            color={"black"}
            textTransform={"none"}
          >
            Drag and drop your documents
          </Typography>
          <Typography
            variant="h6"
            fontWeight={300}
            align="center"
            marginBottom={3}
            fontSize={15}
            color={"black"}
            textTransform={"none"}
          >
            Only .pdf documents are allowed
          </Typography>
          <HiddenInput
            type="file"
            multiple={true}
            onChange={handleFileChange}
          />
        </Box>
      </Button>
    </Stack>
  );
};

export default DragAndDrop;
