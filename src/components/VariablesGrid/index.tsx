import React from "react";
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

interface VariablesGridProps {
  rows: GridRowsProp;
  setOpen: (state: boolean) => void;
}

const VariablesGrid: React.FC<VariablesGridProps> = ({ rows, setOpen }) => {
  const handleDeleteVariable = (id: GridRowId) => {
    // Add your code here
  };

  return (
    <Stack direction={"column"} spacing={1} sx={{ height: "55vh" }}>
      <DataGrid
        rows={rows}
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

const columns = (
  handleDeleteVariable: (id: GridRowId) => void
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
        return (
          params.value && (
            <Chip
              label={params.value}
              variant="outlined"
              style={{ borderColor: "#FFC107", color: "#FFC107" }}
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
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={id}
            icon={<GridDeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteVariable(id)}
            color="inherit"
          />
        ];
      },
      ...sharedProps
    }
  ];
};
