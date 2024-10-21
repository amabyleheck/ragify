import ExtractButton from "@/components/Button/ExtractButton";
import ParametersForm from "@/components/ParametersForm";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const ParametersFormPanel: React.FC = () => {
  return (
    <div className="panel">
      <Stack
        direction={"column"}
        height={"100%"}
        justifyContent={"space-between"}
      >
        <Stack direction={"column"}>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Typography
              variant="h1"
              fontWeight={800}
              align="left"
              fontSize={25}
            >
              RAG Parameters Customization
            </Typography>
            <Typography
              variant="body1"
              fontWeight={100}
              align="left"
              fontSize={15}
            >
              (Optional)
            </Typography>
          </Stack>
        </Stack>
        <ParametersForm />
        <ExtractButton />
      </Stack>
    </div>
  );
};

export default ParametersFormPanel;
