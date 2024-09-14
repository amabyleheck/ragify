import React, { useContext } from "react";
import { Button, Chip, Grid2, Stack, Tooltip, Typography } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridDeleteIcon,
  GridRowId,
  GridRowsProp
} from "@mui/x-data-grid";
import BottomContainer from "../BottomContainer";
import { FormContext } from "@/contexts/form";
import { Variable, VariableLabel, VariableLabelType } from "@/types/Variables";

interface VariablesGridProps {
  setOpen: (state: boolean) => void;
}

const VariablesGrid: React.FC<VariablesGridProps> = ({ setOpen }) => {
  const {
    formData: { variables },
    setVariables
  } = useContext(FormContext);

  const handleDeleteVariable = (name: string) => {
    setVariables(variables.filter(variable => variable.name !== name));
  };

  return (
    <Stack direction={"column"} spacing={1} sx={{ height: "55vh" }}>
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
          Add new variable
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

  return [
    {
      field: "name",
      headerName: "Variable Name",
      width: 200,
      ...sharedProps
    },
    {
      field: "prompt",
      headerName: "Prompt",
      width: 400,
      renderCell: params => {
        const truncatedPrompt =
          params.value?.length > 100
            ? `${params.value?.substring(0, 100)}...`
            : params.value;
        return <Tooltip title={params.value}>{truncatedPrompt}</Tooltip>;
      },
      ...sharedProps
    },
    {
      field: "label",
      headerName: "Label",
      width: 300,
      renderCell: params => {
        const label = VariableLabel[params.value as VariableLabelType];
        return (
          label && (
            <Chip
              label={label.name.toUpperCase()}
              sx={{
                color: label.color,
                border: `1px solid ${label.color}`,
                backgroundColor: `${label.color}10`
              }}
            />
          )
        );
      },
      ...sharedProps
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
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
