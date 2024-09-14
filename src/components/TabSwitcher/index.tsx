import { TabContext } from "@/contexts/tab";
import { Box, Stack } from "@mui/system";
import React, { act, useContext, useState } from "react";
import TabItem from "./Tab";
import { Typography } from "@mui/material";

interface TabSwitcherProps {
  tabs: string[];
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs }) => {
  const { activeTab, setActiveTab } = useContext(TabContext);

  return (
    <Stack className={""} direction={"row"} spacing={2}>
      {tabs &&
        tabs.length > 0 &&
        tabs.map((tab, index) => (
          <TabItem
            key={index}
            selected={tab === activeTab}
            title={tab}
            setActiveTab={setActiveTab}
          />
        ))}
    </Stack>
  );
};

export default TabSwitcher;
