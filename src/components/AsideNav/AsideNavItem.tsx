import { GlobalContext } from "@/contexts/global";
import { NavigationOptionType } from "@/types";
import { Typography } from "@mui/material";
import Icon from "@mui/material/Icon";
import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";

interface AsideNavProps {
  id: Number;
  icon: string;
  title: NavigationOptionType;
}

const AsideNavItem: React.FC<AsideNavProps> = ({ id, icon, title }) => {
  const { pageType, setPageType } = useContext(GlobalContext);
  const selected = pageType === title;

  const elementId = `nav-${id}`;
  return (
    <>
      <input
        className="nav-tab hidden"
        type="checkbox"
        id={elementId}
        checked={selected}
        onChange={() => setPageType(title)}
      />
      <label htmlFor={elementId}>
        <Box
          className={`aside-nav-item ${selected ? "selected" : ""} flex max-h-[6vh] min-h-[6vh] max-w-full items-center rounded-bl-[50px] rounded-tl-[50px] text-left`}
        >
          <Stack
            direction={"row"}
            spacing={1}
            sx={{ paddingLeft: "15px" }}
            alignItems={"center"}
          >
            <Icon
              className={"material-symbols-outlined"}
              sx={{ fontSize: "10px" }}
            >
              {icon}
            </Icon>
            <Typography variant="subtitle1">{title}</Typography>
          </Stack>
        </Box>
      </label>
    </>
  );
};

export default AsideNavItem;
