import { createContext } from "react";

import { NavigationOptionType } from "@/types/index";

export interface GlobalContextType {
  pageType: NavigationOptionType;
  setPageType: (value: NavigationOptionType) => void;
}

export const GlobalContext = createContext<GlobalContextType>({
  pageType: "Documents" as NavigationOptionType,
  setPageType: (_value: string): void => {
    /* Placeholder setter */
  }
});
