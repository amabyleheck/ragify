import { Button, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import CloudUploadIcon from "@mui/icons-material/FileUploadOutlined";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue
} from "react-hook-form";
import HiddenInput from "@/components/DragAndDrop/HiddenInput";

interface DragAndDropProps {
  errors: FieldErrors<{ uploadedFiles: FileList }>;
  setValue: UseFormSetValue<{
    uploadedFiles: FileList;
  }>;
  getValues: UseFormGetValues<{
    uploadedFiles: FileList;
  }>;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({
  errors,
  setValue,
  getValues
}) => {
  // Add your component logic here

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
        onDrag={e => console.log(e)}
        onDrop={e => console.log(e)}
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
            {errors.uploadedFiles?.message}
          </Typography>
          <HiddenInput
            type="file"
            multiple={true}
            onChange={args => {
              args.target.files &&
                setValue("uploadedFiles", args.target.files, {
                  shouldValidate: true
                });
              console.log(getValues());
            }}
          />
        </Box>
      </Button>
    </Stack>
  );
};

export default DragAndDrop;
