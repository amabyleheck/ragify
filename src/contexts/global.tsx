import { createContext } from "react";

import { NavigationOptionType } from "@/types/index";

export interface GlobalContextType {
  pageType: string;
  setPageType: (value: string) => void;
}

export const GlobalContext = createContext<GlobalContextType>({
  pageType: "",
  setPageType: (_value: string): void => {
    /* Placeholder setter */
  }
});
