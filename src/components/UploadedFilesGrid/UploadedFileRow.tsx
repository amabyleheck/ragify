import { DeleteRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";

interface UploadedFileRowProps {
  file: File;
  index: number;
  handleDeleteFile: (name: string) => void;
}

const UploadedFileRow: React.FC<UploadedFileRowProps> = ({
  file,
  index,
  handleDeleteFile
}) => {
  return (
    <Box
      key={index}
      sx={{
        paddingX: "10px",
        ":hover": {
          backgroundColor: "#F2F2F2",
          borderRadius: "5px"
        }
      }}
    >
      <Stack direction={"row"} justifyContent={"space-between"} paddingY={2}>
        <Typography variant="body1">{file.name}</Typography>
        <DeleteRounded
          onClick={() => handleDeleteFile(file.name)}
          color="action"
          sx={{
            ":hover": {
              cursor: "pointer"
            }
          }}
        ></DeleteRounded>
      </Stack>
    </Box>
  );
};

export default UploadedFileRow;
