import { TabContext } from "@/contexts/tab";
import { Box, Stack } from "@mui/system";
import React, { act, useContext, useState } from "react";
import TabItem from "./Tab";

interface TabSwitcherProps {
  tabs: string[];
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs }) => {
  const { activeTab, setActiveTab } = useContext(TabContext);
  const [currentTabs, setTabs] = useState<string[]>(tabs);

  return (
    <Stack className={""} direction={"row"} spacing={2}>
      {tabs &&
        tabs.map((tab, index) => (
          <TabItem
            key={index}
            selected={tab === activeTab}
            title={tab}
            setActiveTab={setActiveTab}
          />
        ))}
      <TabItem setActiveTab={setActiveTab} />
    </Stack>
  );
};

export default TabSwitcher;
