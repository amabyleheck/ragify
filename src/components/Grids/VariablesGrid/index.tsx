import React, { useContext } from "react";
import { Button, Chip, Stack, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridDeleteIcon,
  GridRowsProp
} from "@mui/x-data-grid";
import { FormContext } from "@/contexts/form";
import { Variable, VariableLabel, VariableLabelType } from "@/types/Variables";
import { useSnackbar } from "notistack";

interface VariablesGridProps {
  setOpen: (state: boolean) => void;
}

const VariablesGrid: React.FC<VariablesGridProps> = ({ setOpen }) => {
  const {
    formData: { variables },
    setVariables
  } = useContext(FormContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteVariable = (name: string) => {
    setVariables(variables.filter(variable => variable.name !== name));
    enqueueSnackbar("Variável deletada com sucesso.", { variant: "success" });
  };

  return (
    <Stack direction={"column"} spacing={1} sx={{ height: "65vh" }}>
      <DataGrid
        rows={transformData(variables)}
        columns={columns(handleDeleteVariable)}
        rowHeight={40}
        columnHeaderHeight={40}
      />
      <Stack alignItems={"flex-end"}>
        <Button
          type="button"
          variant="contained"
          tabIndex={-1}
          className="w-60"
          onClick={() => setOpen(true)}
        >
          Adicione uma variável
        </Button>
      </Stack>
    </Stack>
  );
};

export default VariablesGrid;

function transformData(data: Variable[] | null): GridRowsProp | [] {
  return data
    ? data.map((item, index) => ({
        id: index,
        name: item.name,
        label: item.label,
        prompt: item.prompt
      }))
    : [];
}

const columns = (
  handleDeleteVariable: (name: string) => void
): GridColDef[] => {
  const sharedProps = {
    hideSortIcons: true,
    sortable: false,
    filterable: false,
    disableColumnMenu: true
  };

  const valueOrNA = (value: string | undefined) => value || "N/A";

  return [
    {
      field: "name",
      headerName: "Nome da Variável",
      width: 200,
      ...sharedProps
    },
    {
      field: "prompt",
      headerName: "Prompt",
      width: 550,
      renderCell: params => {
        const prompt = valueOrNA(params?.value);
        const truncatedPrompt =
          prompt.length > 100 ? `${prompt.substring(0, 100)}...` : prompt;
        return (
          <Tooltip title={prompt}>
            <>{truncatedPrompt}</>
          </Tooltip>
        );
      },
      ...sharedProps
    },
    {
      field: "label",
      headerName: "Tipo",
      width: 200,
      renderCell: params => {
        const label = VariableLabel[params.value as VariableLabelType];
        return label ? (
          <Chip
            label={label.name.toUpperCase()}
            sx={{
              color: label.color,
              border: `1px solid ${label.color}`,
              backgroundColor: `${label.color}10`
            }}
          />
        ) : (
          "N/A"
        );
      },
      ...sharedProps
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Ações",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem
            key={id}
            icon={<GridDeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteVariable(row.name)}
            color="inherit"
          />
        ];
      },
      ...sharedProps
    }
  ];
};
