import { GlobalContext } from "@/contexts/global";
import { NavigationOptionType } from "@/types";
import { NavigationOption } from "@/utils/consts";
import { Icon, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext } from "react";

const PageTracker: React.FC = () => {
  const { pageType, setPageType } = useContext(GlobalContext);

  return (
    <div className="absolute left-0 top-0 p-3">
      <Stack
        direction={"row"}
        gap={1}
        alignContent={"center"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {pageTrackerSwitch(pageType, setPageType)}
      </Stack>
    </div>
  );
};

export default PageTracker;

const pageTrackerSwitch = (
  pageType: NavigationOptionType,
  setPageType: (value: NavigationOptionType) => void
) => {
  switch (pageType) {
    case NavigationOption.DOCUMENTS.title:
      return (
        <>
          <Icon
            className={"material-symbols-outlined cursor-pointer"}
            sx={{ fontSize: "15px" }}
            onClick={() => setPageType("DOCUMENTS")}
          >
            {NavigationOption.DOCUMENTS.icon}
          </Icon>
          <Typography fontSize={15}>Uploading Documents</Typography>
        </>
      );
    case NavigationOption.VARIABLES.title:
      return (
        <>
          <Icon
            className={"material-symbols-outlined cursor-pointer"}
            sx={{ fontSize: "15px" }}
            onClick={() => setPageType("DOCUMENTS")}
          >
            {NavigationOption.DOCUMENTS.icon}
          </Icon>
          <Icon
            className={"material-symbols-outlined"}
            sx={{ fontSize: "15px" }}
          >
            arrow_forward_ios
          </Icon>
          <Icon
            className={"material-symbols-outlined cursor-pointer"}
            sx={{ fontSize: "15px" }}
            onClick={() => setPageType("VARIABLES")}
          >
            {NavigationOption.VARIABLES.icon}
          </Icon>
          <Typography fontSize={15}>Annotating Variables</Typography>
        </>
      );
    case NavigationOption.PARAMETERS.title:
      return (
        <>
          <Icon
            className={"material-symbols-outlined cursor-pointer"}
            sx={{ fontSize: "15px" }}
            onClick={() => setPageType("DOCUMENTS")}
          >
            {NavigationOption.DOCUMENTS.icon}
          </Icon>
          <Icon
            className={"material-symbols-outlined"}
            sx={{ fontSize: "15px" }}
          >
            arrow_forward_ios
          </Icon>
          <Icon
            className={"material-symbols-outlined cursor-pointer"}
            sx={{ fontSize: "15px" }}
            onClick={() => setPageType("VARIABLES")}
          >
            {NavigationOption.VARIABLES.icon}
          </Icon>
          <Icon
            className={"material-symbols-outlined"}
            sx={{ fontSize: "15px" }}
          >
            arrow_forward_ios
          </Icon>
          <Icon
            className={"material-symbols-outlined cursor-pointer"}
            sx={{ fontSize: "15px" }}
            onClick={() => setPageType("PARAMETERS")}
          >
            {NavigationOption.PARAMETERS.icon}
          </Icon>
          <Typography fontSize={15}>Choosing Parameters</Typography>
        </>
      );
  }
};
