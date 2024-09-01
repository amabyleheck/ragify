import { TabContext } from "@/contexts/tab";
import { Box, Stack } from "@mui/system";
import React, { useContext } from "react";
import TabItem from "./Tab";

interface TabSwitcherProps {
  tabs: string[];
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs }) => {
  const { activeTab, setActiveTab } = useContext(TabContext);

  return (
    <Stack className={""} direction={"row"} spacing={2}>
      {tabs && tabs.map(tab => <TabItem selected title={tab} />)}
      <TabItem newTab />
    </Stack>
  );
};

export default TabSwitcher;
