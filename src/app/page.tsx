"use client";

import { useContext, useState } from "react";
import AsideNav from "@/components/AsideNav/index";
import Header from "@/components/Header";
import { NavigationOption } from "@/utils/consts";
import DocumentsUploadPanel from "@/pages/DocumentsUploadPanel";
import VariablesAnnotationPanel from "@/pages/VariablesAnnotationPanel";
import { GlobalContext } from "@/contexts/global";
import { NavigationOptionType } from "@/types";

export default function Home() {
  const [pageType, setPageType] = useState<NavigationOptionType>(
    NavigationOption.VARIABLES.title as NavigationOptionType
  );

  const componentMap = {
    [NavigationOption.DOCUMENTS.title]: DocumentsUploadPanel,
    [NavigationOption.VARIABLES.title]: VariablesAnnotationPanel,
    [NavigationOption.PARAMETERS.title]: VariablesAnnotationPanel
  };

  const CurrentPanel = componentMap[pageType];

  return (
    <GlobalContext.Provider value={{ pageType, setPageType }}>
      <Header />
      <div className="flex">
        <AsideNav />
        <main>
          <div className="content-wrapper flex min-h-full min-w-[85vw] items-center justify-center bg-gray-200">
            <CurrentPanel />
          </div>
        </main>
      </div>
    </GlobalContext.Provider>
  );
}
