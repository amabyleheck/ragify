import React from "react";
import { Chip, Stack } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridArrowDownwardIcon,
  GridColDef
} from "@mui/x-data-grid";
import useFetchJobs from "@/api/getJobs";

const ResultsGrid: React.FC = () => {
  const { data, loading } = useFetchJobs("");
  //const { enqueueSnackbar } = useSnackbar();

  if (loading) return <div>Loading...</div>;

  const gridColumns = columns();

  return (
    <Stack direction={"column"} spacing={1} sx={{ height: "55vh" }}>
      <DataGrid
        rows={data.jobs}
        columns={gridColumns}
        rowHeight={40}
        columnHeaderHeight={40}
      />
    </Stack>
  );
};

export default ResultsGrid;

// function transformData(data: Job[] | null): GridRowsProp | [] {
//   return data
//     ? data.map((item, index) => ({
//         id: index,
//         name: item.name,
//         label: item.label,
//         prompt: item.prompt
//       }))
//     : [];
// }

const columns = (): GridColDef[] => {
  const sharedProps = {
    hideSortIcons: true,
    sortable: false,
    filterable: false,
    disableColumnMenu: true
  };

  const valueOrNA = (value: string | undefined) => value || "N/A";

  return [
    {
      field: "id",
      headerName: "Extraction ID",
      width: 150,
      ...sharedProps
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: params => {
        const status = valueOrNA(params.value as string);
        const color = getColor(status);
        return status ? (
          <Chip
            label={status.toUpperCase()}
            sx={{
              color: color,
              border: `1px solid ${color}`,
              backgroundColor: `${color}10`
            }}
          />
        ) : (
          "N/A"
        );
      },
      ...sharedProps
    },
    {
      field: "started_at",
      headerName: "Started At",
      width: 300,
      renderCell: params => {
        const date = params.value
          ? new Date(params.value as string).toUTCString()
          : undefined;
        return valueOrNA(date);
      },
      ...sharedProps
    },
    {
      field: "completed_at",
      headerName: "Completed At",
      width: 300,
      renderCell: params => {
        const date = params.value
          ? new Date(params.value as string).toUTCString()
          : undefined;
        return valueOrNA(date);
      },
      ...sharedProps
    },
    {
      field: "result_file",
      type: "actions",
      headerName: "Result File",
      width: 300,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={id}
            icon={<GridArrowDownwardIcon />}
            label="Download"
            color="inherit"
          />
        ];
      },
      ...sharedProps
    }
  ];
};

const getColor = (status: string) => {
  switch (status) {
    case "in_queue":
      return "yellow";
    case "in_progress":
      return "blue";
    case "completed":
      return "green";
    case "failed":
      return "red";
    default:
      return "grey";
  }
};
