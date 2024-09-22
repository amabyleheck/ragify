import BottomContainer from "@/components/BottomContainer";
import ParametersForm from "@/components/ParametersForm";
import { NavigationOptionType } from "@/types";
import { NavigationOption } from "@/utils/consts";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const ParametersFormPanel: React.FC = () => {
  return (
    <div className="panel">
      <Stack
        direction={"column"}
        spacing={1}
        height={"100%"}
        justifyContent={"space-around"}
      >
        <Stack direction={"column"} spacing={3}>
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
        <BottomContainer
          nextPage={NavigationOption.PARAMETERS.title as NavigationOptionType}
        />
      </Stack>
    </div>
  );
};

export default ParametersFormPanel;
