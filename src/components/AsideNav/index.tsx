import { Box, Stack } from "@mui/system";
import { NavigationOption } from "@/utils/consts";
import AsideNavItem from "@/components/AsideNav/AsideNavItem";
import React, { useContext } from "react";
import { NavigationOptionType } from "@/types";
import { GlobalContext } from "@/contexts/global";

const AsideNav: React.FC = () => {
  const { pageType } = useContext(GlobalContext);

  const options = Object.entries(NavigationOption);
  const selectedIndex = options.findIndex(
    ([, item]) => item.title === pageType
  );

  return (
    <aside>
      <Box className="h-screen w-[15vw] min-w-[15vw] bg-white">
        <Stack
          direction="column"
          spacing={0.5}
          sx={{ paddingLeft: "5px", "*": { zIndex: 2 } }}
        >
          {Object.entries(NavigationOption).map(([key, item]) => (
            <AsideNavItem
              key={key}
              id={item.id}
              icon={item.icon}
              title={item.title as NavigationOptionType}
            ></AsideNavItem>
          ))}
          <span
            className="glider"
            style={{
              transform: `translateY(calc(${selectedIndex} * (8vh + 4px)))`
            }}
          ></span>
        </Stack>
      </Box>
    </aside>
  );
};

export default AsideNav;
