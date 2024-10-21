import { GlobalContext } from "@/contexts/global";
import { NavigationOptionType } from "@/types";
import { NavigationOption } from "@/utils/consts";
import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";

interface AsideNavProps {
  id: number;
  icon: React.JSX.Element;
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
          className={
            `aside-nav-item ${selected ? "selected" : ""} ` +
            "flex h-[8vh] max-w-full items-center rounded-l-[50px] text-left"
          }
        >
          <Stack>
            <Stack
              direction={"row"}
              spacing={1}
              sx={{ paddingLeft: "15px" }}
              alignItems={"center"}
            >
              {icon}
              <Typography
                variant="subtitle1"
                className={`${title === NavigationOption.PARAMETERS.title ? "text-gray-400" : ""} `}
              >
                {title}
              </Typography>
            </Stack>
            {title === NavigationOption.PARAMETERS.title && (
              <Typography
                variant="body1"
                className="text-gray-400"
                fontSize={12}
                alignSelf={"end"}
              >
                (Opcional)
              </Typography>
            )}
          </Stack>
        </Box>
      </label>
    </>
  );
};

export default AsideNavItem;
