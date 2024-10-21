import ResultsGrid from "@/components/Grids/ResultsGrid";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const ResultsPanel: React.FC = () => {
  return (
    <div className="panel">
      <Stack
        direction={"column"}
        height={"100%"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <Typography
            variant="h1"
            fontWeight={800}
            align="left"
            fontSize={25}
            className={"pb-6"}
          >
            Resultados de extração
          </Typography>
        </Stack>
        <ResultsGrid />
      </Stack>
    </div>
  );
};

export default ResultsPanel;
