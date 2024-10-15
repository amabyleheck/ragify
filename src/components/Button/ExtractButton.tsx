import React from "react";
import Button from "@mui/material/Button";
import useTriggerExtract from "@/api/useTriggerExtract";

const ExtractButton: React.FC = () => {
  const { triggerExtractHandler, loading } = useTriggerExtract();

  const handleClick = () => {
    triggerExtractHandler();
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      {loading && <span className="spinner" />}
      Extract
    </Button>
  );
};

export default ExtractButton;
