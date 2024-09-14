import { Button, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";
import CloudUploadIcon from "@mui/icons-material/FileUploadOutlined";
import HiddenInput from "@/components/DragAndDrop/HiddenInput";
import { FormContext } from "@/contexts/form";

const DragAndDrop: React.FC = () => {
  const {
    formData: { files },
    setFiles
  } = useContext(FormContext);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files && Array.from(event.target.files);
    if (
      uploadedFiles &&
      uploadedFiles.length > 0 &&
      uploadedFiles.some(file => file.type !== "application/pdf")
    ) {
      alert("Only .pdf documents are allowed");
      // TODO: Update error to toast
      return;
    }
    if (uploadedFiles) {
      const filesArray = uploadedFiles.concat(files);
      setFiles(filesArray);
    }
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
        // onDrag={e => handleFileUpload(e.target)}
        // onDrop={e => console.log(e)}
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
            onChange={handleFileUpload}
          />
        </Box>
      </Button>
    </Stack>
  );
};

export default DragAndDrop;
