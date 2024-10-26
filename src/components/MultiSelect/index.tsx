import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Tooltip } from "@mui/material";

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
        <Tooltip
          title={selectedValue.join(", ")}
          placement="top"
          enterDelay={500}
        >
          <Select
            labelId="demo-multiple-chip-label"
            multiple
            value={selectedValue}
            onChange={onChange}
            input={<OutlinedInput label={title} />}
            renderValue={selected => selected.join(", ")}
            MenuProps={{ style: { maxHeight: 300 } }}
          >
            {values.map(name => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </Tooltip>
      </FormControl>
    </div>
  );
};

export default MultiSelect;
