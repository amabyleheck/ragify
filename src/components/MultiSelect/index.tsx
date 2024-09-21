import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type MultiSelectType = string[];

interface MultiSelectProps {
  title: string;
  selectedValue: MultiSelectType;
  values: MultiSelectType;
  onChange: (event: SelectChangeEvent<string[]>) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  title,
  selectedValue,
  values,
  onChange
}) => {
  return (
    <div>
      <FormControl sx={{ width: 200, maxHeight: "100px" }}>
        <InputLabel id="demo-multiple-chip-label">{title}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          multiple
          label={"TESTE"}
          value={selectedValue}
          onChange={onChange}
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
