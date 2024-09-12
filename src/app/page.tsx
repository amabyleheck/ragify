"use client";

import { useContext, useState } from "react";
import AsideNav from "@/components/AsideNav/index";
import Header from "@/components/Header";
import { NavigationOption } from "@/utils/consts";
import DocumentsUploadPanel from "@/pages/DocumentsUploadPanel";
import VariablesAnnotationPanel from "@/pages/VariablesAnnotationPanel";
import { GlobalContext } from "@/contexts/global";
import { NavigationOptionType } from "@/types";
import ParametersFormPanel from "@/pages/ParametersFormPanel";
import PageTracker from "@/components/PageTracker";
import VariablesDefinitionPanel from "@/pages/VariablesDefinitionPanel";

export default function Home() {
  const [pageType, setPageType] = useState<NavigationOptionType>(
    NavigationOption.VARIABLES.title as NavigationOptionType
  );

  const componentMap = {
    [NavigationOption.DOCUMENTS.title]: DocumentsUploadPanel,
    [NavigationOption.VARIABLES.title]: VariablesDefinitionPanel,
    [NavigationOption.ANNOTATION.title]: VariablesAnnotationPanel,
    [NavigationOption.PARAMETERS.title]: ParametersFormPanel
  };

  const CurrentPanel = componentMap[pageType];

  return (
    <GlobalContext.Provider value={{ pageType, setPageType }}>
      <Header />
      <div className="flex">
        <AsideNav />
        <main>
          <div className="content-wrapper relative flex min-h-full min-w-[85vw] items-center justify-center bg-gray-200">
            <PageTracker />
            <CurrentPanel />
          </div>
        </main>
      </div>
    </GlobalContext.Provider>
  );
}
