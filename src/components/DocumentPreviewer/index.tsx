"use client";

import "@/utils/promisePolyfill";
import React, { useEffect, useState } from "react";
import { Button, Modal, Typography } from "@mui/material";
import { pdfjs, Document, Page } from "react-pdf";
import { Box, Stack } from "@mui/system";
import { FindInPageOutlined } from "@mui/icons-material";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

interface DocumentPreviewerProps {
  file: File;
}

const DocumentPreviewer: React.FC<DocumentPreviewerProps> = ({ file }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`,
        window.location.origin
      ).toString();
    }
  }, []);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FindInPageOutlined onClick={handleOpen} className="cursor-pointer" />
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            bgcolor: "#FFFFFF",
            ...style
          }}
        >
          <Stack direction={"row"} justifyContent={"space-around"}>
            <Button
              onClick={goToPreviousPage}
              disabled={currentPage <= 1}
              className="cursor-pointer"
            >
              Previous Page
            </Button>
            <Box>
              <Typography
                variant="h5"
                fontWeight={800}
                align="center"
                fontSize={20}
              >
                Document Preview
              </Typography>
              <Typography
                variant="h5"
                fontWeight={400}
                align="center"
                fontSize={15}
              >
                Page {currentPage} of {numPages}
              </Typography>
            </Box>
            <Button
              onClick={goToNextPage}
              disabled={currentPage >= numPages}
              className="cursor-pointer"
            >
              Next Page
            </Button>
          </Stack>
          <Box className="row flex items-center justify-center">
            <Stack>
              <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={currentPage} scale={1.2} />
              </Document>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DocumentPreviewer;

const style = {
  height: "80vh",
  width: "50vw",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 3,
  boxShadow: 24,
  padding: 6,
  overflowY: "auto"
};
