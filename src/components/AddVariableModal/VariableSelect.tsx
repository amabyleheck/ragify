import { VariableLabel, VariableLabelType } from "@/types/Variables";
import { Chip, MenuItem, TextField } from "@mui/material";
import React from "react";

interface VariableSelectProps {
  label: string | undefined;
  setLabel: (label: VariableLabelType) => void;
}

const LabelSelect: React.FC<VariableSelectProps> = ({ label, setLabel }) => {
  return (
    <TextField
      select
      label="Label"
      value={label ? label : ""}
      onChange={e => setLabel(e.target.value as VariableLabelType)}
      sx={{ width: "100%" }}
    >
      {Object.keys(VariableLabel).map((key, index) => (
        <MenuItem key={index} value={key}>
          <Chip
            key={index}
            label={VariableLabel[key as VariableLabelType].name.toUpperCase()}
            sx={{
              color: VariableLabel[key as VariableLabelType].color,
              border: `1px solid ${VariableLabel[key as VariableLabelType].color}`,
              backgroundColor: `${VariableLabel[key as VariableLabelType].color}10`
            }}
          />
        </MenuItem>
      ))}
    </TextField>
  );
};

export default LabelSelect;
