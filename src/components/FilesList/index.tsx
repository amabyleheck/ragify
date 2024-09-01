import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext } from "react";
import UploadedFilesGrid from "@/components/UploadedFilesGrid";
import { NavigationOption } from "@/utils/consts";
import { NavigationOptionType } from "@/types";
import { GlobalContext } from "@/contexts/global";

const FilesList: React.FC = () => {
  const { pageType, setPageType } = useContext(GlobalContext);

  return (
    <>
      <Stack spacing={1}>
        <Typography variant="h5" fontWeight={800} align="left" fontSize={20}>
          List of documents
        </Typography>
        <UploadedFilesGrid files={[]} />
      </Stack>
      <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
        <Button type="button" variant="outlined" tabIndex={-1}>
          Discard
        </Button>
        <Button
          type="button"
          variant="contained"
          tabIndex={-1}
          onClick={() =>
            setPageType(
              NavigationOption.VARIABLES.title as NavigationOptionType
            )
          }
        >
          Next
        </Button>
      </Stack>
    </>
  );
};

export default FilesList;
