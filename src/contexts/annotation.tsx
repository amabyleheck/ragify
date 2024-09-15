import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";
import { FormContext } from "@/contexts/form";

interface AnnotationContext {
  [key: string]: { [key: string]: string };
}

interface FormContextProps {
  annotationData: AnnotationContext;
  updateValue: (variable: string, document: string, value: string) => void;
  removeValue: (variable: string) => void;
}

const AnnotationContext = createContext<FormContextProps>({
  annotationData: {},
  updateValue: () => {},
  removeValue: () => {}
});

export const AnnotationProvider = ({ children }: { children: ReactNode }) => {
  const {
    formData: { files, variables }
  } = useContext(FormContext);

  const [annotationData, setAnnotationData] = useState<AnnotationContext>({});

  const updateValue = (variable: string, document: string, value: string) => {
    setAnnotationData(prevState => ({
      ...prevState,
      [variable]: {
        ...prevState[variable],
        [document]: value
      }
    }));
  };

  const removeValue = (variable: string) => {
    const newState = { ...annotationData };
    delete newState[variable];

    setAnnotationData(newState);
  };

  useEffect(() => {
    const initialValues: AnnotationContext = { ...annotationData };
    variables.forEach(variable => {
      if (
        !initialValues[variable.name] ||
        Object.keys(initialValues[variable.name]).length === 0
      ) {
        initialValues[variable.name] = {};
        files.forEach(file => {
          initialValues[variable.name][file.name] = "";
        });
      }
    });
    setAnnotationData(initialValues);
  }, [files, variables]);

  console.log(annotationData);

  return (
    <AnnotationContext.Provider
      value={{ annotationData, updateValue, removeValue }}
    >
      {children}
    </AnnotationContext.Provider>
  );
};
