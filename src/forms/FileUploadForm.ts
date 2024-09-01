import { z } from "zod";

const ACCEPTED_DOC_TYPES = ["application/pdf"];

export const newUploadedFileSchema = z.object({
  uploadedFiles: z.instanceof(FileList).refine((files) => {
    if (!ACCEPTED_DOC_TYPES.includes(files?.[0]?.type))
      throw new Error("Only .PDF files are accepted.");
  }),
});

export type NewUploadedFileFormData = z.infer<typeof newUploadedFileSchema>;
