import { AnnotationContext } from "@/contexts/annotation";
import { TabContext } from "@/contexts/tab";
import { DeleteRounded } from "@mui/icons-material";
import { TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";

interface UploadedFileRowProps {
  file: File;
  index: number;
  handleDeleteFile?: (name: string) => void;
  annotation?: boolean;
}

const UploadedFileRow: React.FC<UploadedFileRowProps> = ({
  file,
  index,
  handleDeleteFile,
  annotation = false
}) => {
  const { activeTab } = useContext(TabContext);

  const { annotationData, updateVariable } = useContext(AnnotationContext);

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      paddingY={2}
      alignItems={"center"}
      sx={{
        paddingX: "10px",
        ":hover": {
          backgroundColor: "#F2F2F2",
          borderRadius: "5px"
        },
        height: "50px"
      }}
    >
      <Typography
        variant="body1"
        color={
          annotation
            ? annotationData[activeTab]?.[file.name]
              ? "success"
              : "textDisabled"
            : "textPrimary"
        }
      >
        {file.name}
      </Typography>
      {annotation ? (
        <TextField
          placeholder="Fill with correct value..."
          size={"small"}
          value={annotationData[activeTab]?.[file.name] || ""}
          onChange={e => updateVariable(activeTab, file.name, e.target.value)}
        />
      ) : (
        <DeleteRounded
          onClick={() => handleDeleteFile?.(file.name)}
          color="action"
          sx={{
            ":hover": {
              cursor: "pointer"
            }
          }}
        ></DeleteRounded>
      )}
    </Stack>
  );
};

export default UploadedFileRow;
