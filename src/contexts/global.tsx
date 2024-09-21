import { createContext } from "react";

export interface GlobalContextType {
  pageType: string;
  setPageType: (value: string) => void;
}

export const GlobalContext = createContext<GlobalContextType>({
  pageType: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setPageType: (_value: string): void => {
    /* Placeholder setter */
  }
});
