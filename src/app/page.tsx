"use client";

import { useState } from "react";
import AsideNav from "@/components/AsideNav";
import { NavigationOption } from "@/utils/consts";
import DocumentsUploadPanel from "@/panels/DocumentsUploadPanel";
import VariablesDefinitionPanel from "@/panels/VariablesDefinitionPanel";
import VariablesAnnotationPanel from "@/panels/VariablesAnnotationPanel";
import ParametersFormPanel from "@/panels/ParametersFormPanel";
import ResultsPanel from "@/panels/ResultsPanel";

// ←–– NEW import
import RandomPdfAnnotationPanel from "@/panels/RandomPdfAnnotationPanel";

import { GlobalContext } from "@/contexts/global";
import { FormProvider } from "@/contexts/form";
import { AnnotationProvider } from "@/contexts/annotation";
import { SnackbarProvider } from "notistack";
import PageTracker from "@/components/PageTracker";
import useSessionStorageId from "@/utils/localStorageId";

export default function Home() {
  const { sessionId, initializeId } = useSessionStorageId();
  const [pageType, setPageType] = useState(NavigationOption.DOCUMENTS.title);

  if (!sessionId) initializeId();

  const componentMap = {
    [NavigationOption.DOCUMENTS.title]: DocumentsUploadPanel,
    [NavigationOption.VARIABLES.title]: VariablesDefinitionPanel,
    [NavigationOption.ANNOTATION.title]: VariablesAnnotationPanel,

    // ←–– NEW mapping
    [NavigationOption.RANDOM_ANNOT.title]: RandomPdfAnnotationPanel,

    [NavigationOption.PARAMETERS.title]: ParametersFormPanel,
    [NavigationOption.RESULTS.title]: ResultsPanel
  };

  const CurrentPanel = componentMap[pageType];

  return (
    <SnackbarProvider>
      <GlobalContext.Provider value={{ pageType, setPageType }}>
        <FormProvider>
          <AnnotationProvider>
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

// "use client";

// import { useState } from "react";
// import AsideNav from "@/components/AsideNav/index";
// import { NavigationOption } from "@/utils/consts";
// import DocumentsUploadPanel from "@/panels/DocumentsUploadPanel";
// import VariablesAnnotationPanel from "@/panels/VariablesAnnotationPanel";
// import { GlobalContext } from "@/contexts/global";
// import ParametersFormPanel from "@/panels/ParametersFormPanel";
// import PageTracker from "@/components/PageTracker";
// import VariablesDefinitionPanel from "@/panels/VariablesDefinitionPanel";
// import { FormProvider } from "@/contexts/form";
// import { AnnotationProvider } from "@/contexts/annotation";
// import { SnackbarProvider } from "notistack";
// import ResultsPanel from "@/panels/ResultsPanel";
// import useSessionStorageId from "@/utils/localStorageId";

// export default function Home() {
//   const { sessionId, initializeId } = useSessionStorageId();
//   const [pageType, setPageType] = useState(NavigationOption.DOCUMENTS.title);

//   if (!sessionId) {
//     initializeId();
//   }

//   const componentMap = {
//     [NavigationOption.DOCUMENTS.title]: DocumentsUploadPanel,
//     [NavigationOption.VARIABLES.title]: VariablesDefinitionPanel,
//     [NavigationOption.ANNOTATION.title]: VariablesAnnotationPanel,
//     [NavigationOption.PARAMETERS.title]: ParametersFormPanel,
//     [NavigationOption.RESULTS.title]: ResultsPanel
//   };

//   const CurrentPanel = componentMap[pageType];

//   return (
//     <SnackbarProvider>
//       <GlobalContext.Provider value={{ pageType, setPageType }}>
//         <FormProvider>
//           <AnnotationProvider>
//             <div className="flex">
//               <AsideNav />
//               <main>
//                 <div className="content-wrapper relative flex h-full min-w-[85vw] items-center justify-center bg-gray-200">
//                   <PageTracker />
//                   <CurrentPanel />
//                 </div>
//               </main>
//             </div>
//           </AnnotationProvider>
//         </FormProvider>
//       </GlobalContext.Provider>
//     </SnackbarProvider>
//   );
// }
