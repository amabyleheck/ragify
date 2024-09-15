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
  updateVariable: (variable: string, document: string, value: string) => void;
  removeVariable: (variable: string) => void;
}

export const AnnotationContext = createContext<FormContextProps>({
  annotationData: {},
  updateVariable: () => {},
  removeVariable: () => {}
});

export const AnnotationProvider = ({ children }: { children: ReactNode }) => {
  const {
    formData: { files, variables }
  } = useContext(FormContext);

  const [annotationData, setAnnotationData] = useState<AnnotationContext>({});

  const updateVariable = (
    variable: string,
    document: string,
    value: string
  ) => {
    setAnnotationData(prevState => ({
      ...prevState,
      [variable]: {
        ...prevState[variable],
        [document]: value
      }
    }));
  };

  const removeVariable = (variable: string) => {
    const newState = { ...annotationData };
    delete newState[variable];

    setAnnotationData(newState);
  };

  useEffect(() => {
    const initialValues: AnnotationContext = { ...annotationData };
    variables.forEach(variable => {
      if (
        (!initialValues[variable.name] ||
          Object.keys(initialValues[variable.name]).length === 0) &&
        files.length > 0
      ) {
        initialValues[variable.name] = {};
        files.forEach(file => {
          initialValues[variable.name][file.name] = "";
        });
      }
    });
    setAnnotationData(initialValues);
  }, [files, variables]);

  return (
    <AnnotationContext.Provider
      value={{ annotationData, updateVariable, removeVariable }}
    >
      {children}
    </AnnotationContext.Provider>
  );
};
