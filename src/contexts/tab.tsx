import React, { createContext, PropsWithChildren, useState } from "react";

interface TabContextProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TabContext = createContext<TabContextProps>({
  activeTab: "Variable 1",
  setActiveTab: () => {}
});

export const TabProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [activeTab, setActiveTab] = useState("");

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};
