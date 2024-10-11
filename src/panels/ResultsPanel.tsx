import ResultsGrid from "@/components/Grids/ResultsGrid";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const ResultsPanel: React.FC = () => {
  return (
    <div className="panel">
      <Stack
        direction={"column"}
        spacing={1}
        height={"100%"}
        justifyContent={"space-around"}
      >
        <Stack direction={"column"} spacing={3}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography
              variant="h1"
              fontWeight={800}
              align="left"
              fontSize={25}
              className={"pb-6"}
            >
              Extraction Results
            </Typography>
          </Stack>
          <ResultsGrid />
        </Stack>
      </Stack>
    </div>
  );
};

export default ResultsPanel;
