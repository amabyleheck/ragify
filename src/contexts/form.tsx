// src/contexts/form.tsx

import React, { createContext, ReactNode, useContext, useState } from "react";
import { ParametersFormData } from "@/types/Parameters/index";
import { Variable } from "@/types/Variables";

// ——— New: Annotation type for marking up PDF text ———
export interface Annotation {
  page: number;
  text: string;
  // PDF coordinate-space bounding box
  bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  variableName: string;
}

interface GlobalFormContext {
  files: File[];
  parameters: ParametersFormData;
  variables: Variable[];

  // ——— New fields ———
  selectedPdf: File | null;
  annotations: Annotation[];
}

interface FormContextProps {
  formData: GlobalFormContext;
  setFormData: (context: GlobalFormContext) => void;

  setFiles: (files: File[]) => void;
  setVariables: (variables: Variable[]) => void;
  setModelParameter: (value: string[]) => void;
  setEmbeddingKey: (
    key: keyof Partial<GlobalFormContext["parameters"]["embeddings"]>,
    value: string[]
  ) => void;
  setRetrievalKey: (
    key: keyof Partial<GlobalFormContext["parameters"]["retrieval"]>,
    value: { device: string } | string[]
  ) => void;

  // ——— New setters ———
  setSelectedPdf: (pdf: File | null) => void;
  addAnnotation: (annotation: Annotation) => void;
}

export const FormContext = createContext<FormContextProps>({
  formData: {
    variables: [],
    files: [],
    parameters: {
      model: ["llama3.1:70b"],
      embeddings: {
        bert_model: ["bert-large-portuguese-cased"],
        chunk_size: ["512"],
        chunk_overlap: ["20"],
        embedding_model: ["HuggingFaceBgeEmbeddings"],
        vector_db: ["Chroma"],
        text_splitter: ["RecursiveCharacterTextSplitter"]
      },
      retrieval: {
        chain_type: ["stuff"],
        top_k: ["3"],
        device_map: {
          device: "mps"
        }
      }
    },

    // ——— initialize new fields ———
    selectedPdf: null,
    annotations: []
  },
  setFormData: () => {},

  setFiles: () => {},
  setVariables: () => {},
  setModelParameter: () => {},
  setEmbeddingKey: () => {},
  setRetrievalKey: () => {},

  // ——— no-ops for new setters ———
  setSelectedPdf: () => {},
  addAnnotation: () => {}
});

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<GlobalFormContext>({
    variables: [],
    files: [],
    parameters: {
      model: ["llama3.1:70b"],
      embeddings: {
        bert_model: ["bert-large-portuguese-cased"],
        chunk_size: ["512"],
        chunk_overlap: ["20"],
        embedding_model: ["HuggingFaceBgeEmbeddings"],
        vector_db: ["Chroma"],
        text_splitter: ["RecursiveCharacterTextSplitter"]
      },
      retrieval: {
        chain_type: ["stuff"],
        top_k: ["3"],
        device_map: {
          device: "mps"
        }
      }
    },

    // ——— initial values ———
    selectedPdf: null,
    annotations: []
  });

  const setFiles = (files: File[]) => {
    setFormData(prev => ({ ...prev, files }));
  };

  const setVariables = (variables: Variable[]) => {
    setFormData(prev => ({ ...prev, variables }));
  };

  const setModelParameter = (value: string[]) => {
    setFormData(prev => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        model: value
      }
    }));
  };

  const setEmbeddingKey = (
    key: keyof Partial<GlobalFormContext["parameters"]["embeddings"]>,
    value: string[]
  ) => {
    setFormData(prev => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        embeddings: {
          ...prev.parameters.embeddings,
          [key]: value
        }
      }
    }));
  };

  const setRetrievalKey = (
    key: keyof Partial<GlobalFormContext["parameters"]["retrieval"]>,
    value: { device: string } | string[]
  ) => {
    setFormData(prev => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        retrieval: {
          ...prev.parameters.retrieval,
          [key]: value
        }
      }
    }));
  };

  // ——— new: pick or clear the current PDF ———
  const setSelectedPdf = (pdf: File | null) => {
    setFormData(prev => ({
      ...prev,
      selectedPdf: pdf,
      // if you pick a new PDF, reset its annotations
      annotations: pdf ? [] : prev.annotations
    }));
  };

  // ——— new: append one annotation ———
  const addAnnotation = (annotation: Annotation) => {
    setFormData(prev => ({
      ...prev,
      annotations: [...prev.annotations, annotation]
    }));
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        setFiles,
        setVariables,
        setModelParameter,
        setEmbeddingKey,
        setRetrievalKey,
        setSelectedPdf,
        addAnnotation
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

// import React, { createContext, ReactNode, useContext, useState } from "react";
// import { ParametersFormData } from "@/types/Parameters/index";
// import { Variable } from "@/types/Variables";

// interface GlobalFormContext {
//   files: File[];
//   parameters: ParametersFormData;
//   variables: Variable[];
// }

// interface FormContextProps {
//   formData: GlobalFormContext;
//   setFormData: (context: GlobalFormContext) => void;
//   setFiles: (files: File[]) => void;
//   setVariables: (variables: Variable[]) => void;
//   setModelParameter: (value: string[]) => void;
//   setEmbeddingKey: (
//     key: keyof Partial<GlobalFormContext["parameters"]["embeddings"]>,
//     value: string[]
//   ) => void;
//   setRetrievalKey: (
//     key: keyof Partial<GlobalFormContext["parameters"]["retrieval"]>,
//     value: { device: string } | string[]
//   ) => void;
// }

// export const FormContext = createContext<FormContextProps>({
//   formData: {
//     variables: [],
//     files: [],
//     parameters: {
//       model: ["llama3.1:70b"],
//       embeddings: {
//         bert_model: ["bert-large-portuguese-cased"],
//         chunk_size: ["512"],
//         chunk_overlap: ["20"],
//         embedding_model: ["HuggingFaceBgeEmbeddings"],
//         vector_db: ["Chroma"],
//         text_splitter: ["RecursiveCharacterTextSplitter"]
//       },
//       retrieval: {
//         chain_type: ["stuff"],
//         top_k: ["3"],
//         device_map: {
//           device: "mps"
//         }
//       }
//     }
//   },
//   setFormData: () => {},
//   setFiles: () => {},
//   setVariables: () => {},
//   setModelParameter: () => {},
//   setEmbeddingKey: () => {},
//   setRetrievalKey: () => {}
// });

// export const useFormContext = () => {
//   const context = useContext(FormContext);
//   if (!context) {
//     throw new Error("useFormContext must be used within a FormProvider");
//   }
//   return context;
// };

// export const FormProvider = ({ children }: { children: ReactNode }) => {
//   const [formData, setFormData] = useState<GlobalFormContext>({
//     variables: [],
//     files: [],
//     parameters: {
//       model: ["llama3.1:70b"],
//       embeddings: {
//         bert_model: ["bert-large-portuguese-cased"],
//         chunk_size: ["512"],
//         chunk_overlap: ["20"],
//         embedding_model: ["HuggingFaceBgeEmbeddings"],
//         vector_db: ["Chroma"],
//         text_splitter: ["RecursiveCharacterTextSplitter"]
//       },
//       retrieval: {
//         chain_type: ["stuff"],
//         top_k: ["3"],
//         device_map: {
//           device: "mps"
//         }
//       }
//     }
//   });

//   const setFiles = (files: File[]) => {
//     setFormData(prev => ({ ...prev, files }));
//   };

//   const setVariables = (variables: Variable[]) => {
//     setFormData(prev => ({ ...prev, variables }));
//   };

//   const setModelParameter = (value: string[]) => {
//     setFormData(prev => ({
//       ...prev,
//       parameters: {
//         ...prev.parameters,
//         ["model"]: value
//       }
//     }));
//   };

//   const setEmbeddingKey = (
//     key: keyof Partial<GlobalFormContext["parameters"]["embeddings"]>,
//     value: string[]
//   ) => {
//     setFormData(prev => ({
//       ...prev,
//       parameters: {
//         ...prev.parameters,
//         embeddings: {
//           ...prev.parameters.embeddings,
//           [key]: value
//         }
//       }
//     }));
//   };

//   const setRetrievalKey = (
//     key: keyof Partial<GlobalFormContext["parameters"]["retrieval"]>,
//     value: { device: string } | string[]
//   ) => {
//     setFormData(prev => ({
//       ...prev,
//       parameters: {
//         ...prev.parameters,
//         retrieval: {
//           ...prev.parameters.retrieval,
//           [key]: value
//         }
//       }
//     }));
//   };

//   return (
//     <FormContext.Provider
//       value={{
//         formData,
//         setFormData,
//         setFiles,
//         setVariables,
//         setModelParameter,
//         setEmbeddingKey,
//         setRetrievalKey
//       }}
//     >
//       {children}
//     </FormContext.Provider>
//   );
// };
