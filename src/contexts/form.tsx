import React, { createContext, ReactNode, useContext, useState } from "react";
import { ParametersFormData } from "@/types/Parameters/index";
import { Variable } from "@/types/Variables";

interface GlobalFormContext {
  files: File[];
  parameters: ParametersFormData;
  variables: Variable[];
}

interface FormContextProps {
  formData: GlobalFormContext;
  setFormData: (context: GlobalFormContext) => void;
  setFiles: (files: File[]) => void;
  setParameters: (parameters: ParametersFormData) => void;
  setVariables: (variables: Variable[]) => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

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
      prompts: [],
      model: [],
      embeddings: {
        bert_model: "bert-large-portuuguese-cased",
        chunk_size: 512,
        chunk_overlap: 20,
        embedding_model: "HuggingFaceBgeEmbeddings",
        vector_db: "Chroma",
        text_splitter: ""
      },
      retrieval: {
        chain_type: "stuff",
        top_k: 3,
        device_map: {
          device: "cuda:0"
        }
      }
    }
  });

  const setFiles = (files: File[]) => {
    setFormData(prev => ({ ...prev, files }));
  };

  const setParameters = (parameters: ParametersFormData) => {
    setFormData(prev => ({ ...prev, parameters }));
  };

  const setVariables = (variables: Variable[]) => {
    setFormData(prev => ({ ...prev, variables }));
  };

  return (
    <FormContext.Provider
      value={{ formData, setFormData, setFiles, setParameters, setVariables }}
    >
      {children}
    </FormContext.Provider>
  );
};
