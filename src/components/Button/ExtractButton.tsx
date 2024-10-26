import React from "react";
import Button from "@mui/material/Button";
import useTriggerExtract from "@/api/useTriggerExtract";
import { Stack } from "@mui/system";

const ExtractButton: React.FC = () => {
  const { triggerExtractHandler, loading } = useTriggerExtract();

  const handleClick = () => {
    triggerExtractHandler();
  };

  return (
    <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
      <Button variant="contained" color="primary" onClick={handleClick}>
        {loading && <span className="spinner" />}
        Extrair
      </Button>
    </Stack>
  );
};

export default ExtractButton;
