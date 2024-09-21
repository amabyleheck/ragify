import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

type MultiSelectType = string[] | number[];

interface MultiSelectProps {
  title: string;
  values: MultiSelectType;
  onChange: (value: MultiSelectType) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ title, values }) => {
  const [value, setValue] = useState<MultiSelectType>([]);

  const handleChange = (event: SelectChangeEvent<MultiSelectType>) => {
    const {
      target: { value }
    } = event;
    setValue(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ width: 200, maxHeight: "100px" }}>
        <InputLabel id="demo-multiple-chip-label">{title}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          multiple
          label={"TESTE"}
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label={title} />}
          renderValue={selected => selected.join(", ")}
        >
          {values.map(name => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultiSelect;
