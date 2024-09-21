import { TabContext } from "@/contexts/tab";
import { Stack } from "@mui/system";
import React, { useContext } from "react";
import TabItem from "@/components/TabSwitcher/Tab";

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
