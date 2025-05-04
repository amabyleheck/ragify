// src/panels/RandomPdfAnnotationPanel.tsx
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef, useState, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Stack, Typography, Button } from "@mui/material";

import { useFormContext, Annotation } from "@/contexts/form";
import BottomContainer from "@/components/BottomContainer";
import { NavigationOption } from "@/utils/consts";
import { NavigationOptionType } from "@/types";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PAGE_WIDTH = 800; // width used for render AND for bbox math

const RandomPdfAnnotationPanel: React.FC = () => {
  /********************  context  ********************/
  const {
    formData: { files, variables, selectedPdf, annotations },
    setSelectedPdf,
    addAnnotation
  } = useFormContext();

  /********************  local state  ********************/
  const [numPages, setNumPages] = useState(0);
  const [showPicker, setShowPicker] = useState(false);

  const pendingSelection = useRef<{
    page: number;
    text: string;
    bbox: Annotation["bbox"];
  } | null>(null);

  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  /********************  pick random PDF on mount  ********************/
  useEffect(() => {
    if (!selectedPdf && files.length) {
      const pdfs = files.filter(f => f.type === "application/pdf");
      if (pdfs.length) {
        setSelectedPdf(pdfs[Math.floor(Math.random() * pdfs.length)]);
      }
    }
  }, [files, selectedPdf, setSelectedPdf]);

  /********************  memo: annotations grouped by page  ********************/
  const annotsByPage = useMemo(() => {
    const map: Record<number, Annotation[]> = {};
    for (const a of annotations) (map[a.page] ??= []).push(a);
    return map;
  }, [annotations]);

  const onDocLoad = ({ numPages }: { numPages: number }) =>
    setNumPages(numPages);

  /********************  selection handler  ********************/
  const handleMouseUp = (pageIdx: number) => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;

    const text = sel.toString().trim();
    if (!text) {
      sel.removeAllRanges();
      return;
    }

    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const pageEl = pageRefs.current[pageIdx];
    if (!pageEl) return;

    const pageRect = pageEl.getBoundingClientRect();
    const bbox: Annotation["bbox"] = {
      x: rect.left - pageRect.left,
      y: rect.top - pageRect.top,
      width: rect.width,
      height: rect.height
    };

    pendingSelection.current = {
      page: pageIdx + 1,
      text,
      bbox
    };
    setShowPicker(true);

    sel.removeAllRanges(); // clear blue highlight
  };

  /********************  commit annotation  ********************/
  const saveWithVariable = (variableName: string) => {
    const sel = pendingSelection.current;
    if (!sel) return;
    addAnnotation({ ...sel, variableName });
    pendingSelection.current = null;
    setShowPicker(false);
  };

  /********************  random-PDF reroll  ********************/
  const rerollPdf = () => {
    const pdfs = files.filter(f => f.type === "application/pdf");
    if (pdfs.length < 2) return;
    let next: File;
    do {
      next = pdfs[Math.floor(Math.random() * pdfs.length)];
    } while (next === selectedPdf);
    setSelectedPdf(next); // ⬅ your provider resets annotations here
  };

  /********************  render  ********************/
  if (!selectedPdf) {
    return (
      <Typography>
        Primeiro faça upload de um PDF para começar a anotação.
      </Typography>
    );
  }

  return (
    <div className="panel">
      <Stack spacing={2} height="100%" justifyContent="space-between">
        {/* header */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h1" fontSize={25} fontWeight={800}>
            Anotação Aleatória de PDF
          </Typography>
          <Button size="small" onClick={rerollPdf}>
            Outro PDF
          </Button>
        </Stack>

        {/* viewer with highlights */}
        <div style={{ flex: 1, overflow: "auto" }}>
          <Document file={selectedPdf} onLoadSuccess={onDocLoad}>
            {Array.from({ length: numPages }, (_, i) => {
              const pageNo = i + 1;
              const pageHighlights = annotsByPage[pageNo] ?? [];

              return (
                <div
                  key={`page_wrap_${i}`}
                  ref={el => {
                    pageRefs.current[i] = el;
                  }}
                  style={{ position: "relative" }}
                  onMouseUp={() => handleMouseUp(i)}
                >
                  <Page
                    pageNumber={pageNo}
                    width={PAGE_WIDTH}
                    renderTextLayer
                    renderAnnotationLayer={false}
                  />

                  {/* overlay each saved bbox */}
                  {pageHighlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="pointer-events-none"
                      style={{
                        position: "absolute",
                        left: h.bbox.x,
                        top: h.bbox.y,
                        width: h.bbox.width,
                        height: h.bbox.height,
                        background: "rgba(255, 221, 0, 0.35)",
                        borderRadius: 2
                      }}
                    />
                  ))}
                </div>
              );
            })}
          </Document>
        </div>

        {/* variable picker */}
        {showPicker && pendingSelection.current && (
          <div className="fixed bottom-24 left-6 z-50 rounded-md bg-white p-4 shadow-lg">
            <Typography variant="body2" className="mb-2">
              Tag&nbsp;
              <em>
                “{pendingSelection.current.text.slice(0, 120)}
                {pendingSelection.current.text.length > 120 ? "…" : ""}”
              </em>
            </Typography>
            <Stack direction="row" spacing={1}>
              {variables.map(v => (
                <Button
                  key={v.name}
                  size="small"
                  variant="outlined"
                  onClick={() => saveWithVariable(v.name)}
                >
                  {v.name}
                </Button>
              ))}
              <Button
                size="small"
                onClick={() => {
                  setShowPicker(false);
                  pendingSelection.current = null;
                }}
              >
                Cancelar
              </Button>
            </Stack>
          </div>
        )}

        <BottomContainer
          nextPage={NavigationOption.PARAMETERS.title as NavigationOptionType}
        />
      </Stack>
    </div>
  );
};

export default RandomPdfAnnotationPanel;

// // src/panels/RandomPdfAnnotationPanel.tsx
// /* eslint-disable react-hooks/exhaustive-deps */

// import React, { useEffect, useRef, useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import { Stack, Typography, Button } from "@mui/material";

// import { useFormContext, Annotation } from "@/contexts/form";
// import BottomContainer from "@/components/BottomContainer";
// import { NavigationOption } from "@/utils/consts";
// import { NavigationOptionType } from "@/types";

// // Tell PDF.js where its worker lives (required for vite/next dev servers)
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// const RandomPdfAnnotationPanel: React.FC = () => {
//   /*********************  context *********************/
//   const {
//     formData: { files, variables, selectedPdf },
//     setSelectedPdf,
//     addAnnotation
//   } = useFormContext();

//   /*********************  local state *********************/
//   const [numPages, setNumPages] = useState(0);
//   const [showPicker, setShowPicker] = useState(false); // controls variable-picker UI

//   // holds last selection info until the user clicks a variable button
//   const pendingSelection = useRef<{
//     page: number;
//     text: string;
//     bbox: Annotation["bbox"];
//   } | null>(null);

//   /** one `ref` slot per page wrapper so we can measure its bounds */
//   const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

//   /*********************  pick a random PDF on mount  *********************/
//   useEffect(() => {
//     if (!selectedPdf && files.length) {
//       const pdfs = files.filter(f => f.type === "application/pdf");
//       if (pdfs.length) {
//         setSelectedPdf(pdfs[Math.floor(Math.random() * pdfs.length)]);
//       }
//     }
//   }, [files, selectedPdf, setSelectedPdf]);

//   /*********************  PDF load success  *********************/
//   const onDocLoad = ({ numPages }: { numPages: number }) =>
//     setNumPages(numPages);

//   /*********************  handle text selection  *********************/
//   const handleMouseUp = (pageIdx: number) => {
//     const sel = window.getSelection();
//     if (!sel || sel.isCollapsed) return;

//     const text = sel.toString().trim();
//     if (!text) {
//       sel.removeAllRanges();
//       return;
//     }

//     const range = sel.getRangeAt(0);
//     const rect = range.getBoundingClientRect();
//     const pageEl = pageRefs.current[pageIdx];
//     if (!pageEl) return;

//     const pageRect = pageEl.getBoundingClientRect();
//     const bbox: Annotation["bbox"] = {
//       x: rect.left - pageRect.left,
//       y: rect.top - pageRect.top,
//       width: rect.width,
//       height: rect.height
//     };

//     // store info until the user picks a variable
//     pendingSelection.current = {
//       page: pageIdx + 1,
//       text,
//       bbox
//     };
//     setShowPicker(true);

//     // optional: clear blue browser highlight
//     sel.removeAllRanges();
//   };

//   /*********************  commit annotation *********************/
//   const saveWithVariable = (variableName: string) => {
//     const sel = pendingSelection.current;
//     if (!sel) return;
//     addAnnotation({ ...sel, variableName });
//     pendingSelection.current = null;
//     setShowPicker(false);
//   };

//   /*********************  choose another random PDF *********************/
//   const rerollPdf = () => {
//     const pdfs = files.filter(f => f.type === "application/pdf");
//     if (pdfs.length < 2) return;
//     let pick: File;
//     do {
//       pick = pdfs[Math.floor(Math.random() * pdfs.length)];
//     } while (pick === selectedPdf);
//     setSelectedPdf(pick);
//   };

//   /*********************  render  *********************/
//   if (!selectedPdf) {
//     return (
//       <Typography>
//         Faça upload de um PDF primeiro para começar a anotação aleatória.
//       </Typography>
//     );
//   }

//   return (
//     <div className="panel">
//       <Stack spacing={2} height="100%" justifyContent="space-between">
//         {/* header */}
//         <Stack direction="row" spacing={1} alignItems="center">
//           <Typography variant="h1" fontSize={25} fontWeight={800}>
//             Anotação Aleatória de PDF
//           </Typography>
//           <Button size="small" onClick={rerollPdf}>
//             Outro PDF
//           </Button>
//         </Stack>

//         {/* viewer */}
//         <div style={{ flex: 1, overflow: "auto" }}>
//           <Document file={selectedPdf} onLoadSuccess={onDocLoad}>
//             {Array.from({ length: numPages }, (_, i) => (
//               <div
//                 key={`page_wrap_${i}`}
//                 ref={(el: HTMLDivElement | null) => {
//                   pageRefs.current[i] = el;
//                 }}
//                 data-page={i + 1}
//                 style={{ position: "relative" }}
//                 onMouseUp={() => handleMouseUp(i)}
//               >
//                 <Page
//                   pageNumber={i + 1}
//                   width={800}
//                   renderTextLayer
//                   renderAnnotationLayer={false}
//                 />
//               </div>
//             ))}
//           </Document>
//         </div>

//         {/* variable picker */}
//         {showPicker && pendingSelection.current && (
//           <div className="fixed bottom-24 left-6 z-50 rounded-md bg-white p-4 shadow-lg">
//             <Typography variant="body2" className="mb-2">
//               Tag sele&ccedil;&atilde;o&nbsp;
//               <em>
//                 “{pendingSelection.current.text.slice(0, 120)}
//                 {pendingSelection.current.text.length > 120 ? "…" : ""}”
//               </em>
//             </Typography>
//             <Stack direction="row" spacing={1}>
//               {variables.map(v => (
//                 <Button
//                   key={v.name}
//                   size="small"
//                   variant="outlined"
//                   onClick={() => saveWithVariable(v.name)}
//                 >
//                   {v.name}
//                 </Button>
//               ))}
//               <Button
//                 size="small"
//                 onClick={() => {
//                   setShowPicker(false);
//                   pendingSelection.current = null;
//                 }}
//               >
//                 Cancelar
//               </Button>
//             </Stack>
//           </div>
//         )}

//         <BottomContainer
//           nextPage={NavigationOption.PARAMETERS.title as NavigationOptionType}
//         />
//       </Stack>
//     </div>
//   );
// };

// export default RandomPdfAnnotationPanel;
