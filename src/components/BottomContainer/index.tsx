import { GlobalContext } from "@/contexts/global";
import { NavigationOptionType } from "@/types";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext } from "react";

interface BottomContainerProps {
  nextPage: NavigationOptionType;
}

const BottomContainer: React.FC<BottomContainerProps> = ({ nextPage }) => {
  const { setPageType } = useContext(GlobalContext);

  return (
    <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
      <Button type="button" variant="outlined" tabIndex={-1}>
        Discard
      </Button>
      <Button
        type="button"
        variant="contained"
        tabIndex={-1}
        onClick={() => setPageType(nextPage)}
      >
        Next
      </Button>
    </Stack>
  );
};

export default BottomContainer;
