import { Stack } from "@mui/system";
import React from "react";

const ResultsPanel: React.FC = () => {
  return (
    <div className="panel">
      <Stack
        direction={"column"}
        spacing={5}
        height={"100%"}
        justifyContent={"space-around"}
      ></Stack>
    </div>
  );
};

export default ResultsPanel;
