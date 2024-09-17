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
        spacing={3}
        height={"100%"}
        justifyContent={"space-around"}
      >
        <Stack direction={"column"} spacing={3}>
          <Typography variant="h1" fontWeight={800} align="left" fontSize={25}>
            Parameters customization
          </Typography>
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
