"use client";

import { useState } from "react";
import AsideNav from "@/components/AsideNav/index";
// import Header from "@/components/Header";
import { NavigationOption } from "@/utils/consts";
import DocumentsUploadPanel from "@/pages/DocumentsUploadPanel";
import VariablesAnnotationPanel from "@/pages/VariablesAnnotationPanel";
import { GlobalContext } from "@/contexts/global";
import ParametersFormPanel from "@/pages/ParametersFormPanel";
import PageTracker from "@/components/PageTracker";
import VariablesDefinitionPanel from "@/pages/VariablesDefinitionPanel";
import { FormProvider } from "@/contexts/form";
import { AnnotationProvider } from "@/contexts/annotation";
import { SnackbarProvider } from "notistack";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function Home() {
  const [pageType, setPageType] = useState(NavigationOption.PARAMETERS.title);

  const componentMap = {
    [NavigationOption.DOCUMENTS.title]: DocumentsUploadPanel,
    [NavigationOption.VARIABLES.title]: VariablesDefinitionPanel,
    [NavigationOption.ANNOTATION.title]: VariablesAnnotationPanel,
    [NavigationOption.PARAMETERS.title]: ParametersFormPanel
  };

  const CurrentPanel = componentMap[pageType];

  return (
    <SnackbarProvider>
      <GlobalContext.Provider value={{ pageType, setPageType }}>
        <FormProvider>
          <AnnotationProvider>
            {/* <Header /> */}
            <div className="flex">
              <AsideNav />
              <main>
                <div className="content-wrapper relative flex h-full min-w-[85vw] items-center justify-center bg-gray-200">
                  <PageTracker />
                  <CurrentPanel />
                </div>
              </main>
            </div>
          </AnnotationProvider>
        </FormProvider>
      </GlobalContext.Provider>
    </SnackbarProvider>
  );
}
