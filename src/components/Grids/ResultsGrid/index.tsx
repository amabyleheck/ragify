import React from "react";
import { Chip, Stack } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridArrowDownwardIcon,
  GridColDef
} from "@mui/x-data-grid";
import useFetchJobs from "@/api/useFetchJobs";

const ResultsGrid: React.FC = () => {
  const { data, loading } = useFetchJobs();
  //const { enqueueSnackbar } = useSnackbar();

  if (loading) return <div>Loading...</div>;

  const gridColumns = columns();

  return (
    <Stack direction={"column"} sx={{ height: "70vh" }}>
      <DataGrid
        rows={data?.jobs}
        columns={gridColumns}
        rowHeight={40}
        columnHeaderHeight={40}
      />
    </Stack>
  );
};

export default ResultsGrid;

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
      getActions: ({ id, row }) => {
        if (!row.result_file) return [];

        const handleDownload = () => {
          const link = document.createElement("a");
          const byteCharacters = atob(row.result_file);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          });
          const url = URL.createObjectURL(blob);
          link.href = url;
          link.download = `extraction_result_${row.completed_at}.xlsx`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };

        return [
          <GridActionsCellItem
            key={id}
            icon={<GridArrowDownwardIcon />}
            label="Download"
            color="inherit"
            onClick={handleDownload}
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
