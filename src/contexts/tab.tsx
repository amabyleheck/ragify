import React, { createContext, PropsWithChildren, useState } from "react";

interface TabContextProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TabContext = createContext<TabContextProps>({
  activeTab: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setActiveTab: (tab: string) => {}
});

interface TabProviderProps extends PropsWithChildren {
  defaultTab: string;
}

export const TabProvider: React.FC<TabProviderProps> = ({
  defaultTab,
  children
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};
