import { Stack, Tooltip, Typography } from "@mui/material";
import BottomContainer from "@/components/BottomContainer";
import { NavigationOption } from "@/utils/consts";
import { NavigationOptionType } from "@/types";
import { InfoOutlined } from "@mui/icons-material";
import VariablesGrid from "@/components/VariablesGrid";
import { useContext, useState } from "react";
import AddVariableModal from "@/components/AddVariableModal";
import { FormContext } from "@/contexts/form";

const VariablesDefinition: React.FC = () => {
  const {
    formData: { variables }
  } = useContext(FormContext);

  const [open, setOpen] = useState(false);

  return (
    <div className="panel">
      <Stack direction={"column"} spacing={3}>
        <Stack direction={"column"} spacing={3}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography
              variant="h1"
              fontWeight={800}
              align="left"
              fontSize={25}
            >
              Variables
            </Typography>
            <Tooltip title="Esse eh um teste longo de tooltip!" placement="top">
              <InfoOutlined fontSize="small" />
            </Tooltip>
          </Stack>
          <VariablesGrid setOpen={setOpen} />
          <AddVariableModal open={open} handleClose={() => setOpen(false)} />
        </Stack>
        <BottomContainer
          nextPage={NavigationOption.ANNOTATION.title as NavigationOptionType}
        />
      </Stack>
    </div>
  );
};

export default VariablesDefinition;
