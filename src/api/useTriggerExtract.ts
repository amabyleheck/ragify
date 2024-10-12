import { AnnotationContext } from "@/contexts/annotation";
import { FormContext } from "@/contexts/form";
import useSessionStorageId from "@/utils/localStorageId";
import { useSnackbar } from "notistack";
import { useContext, useState } from "react";

const useTriggerExtract = () => {
  const [loading, setLoading] = useState(false);

  const useTriggerExtractHandler = async () => {
    const {
      formData: { files, parameters, variables }
    } = useContext(FormContext);

    const { annotationData } = useContext(AnnotationContext);
    const { sessionId } = useSessionStorageId();

    const { enqueueSnackbar } = useSnackbar();

    setLoading(true);

    const extractData = {
      form: {
        parameters: parameters,
        variables: variables
      },
      annotation: annotationData
    };

    try {
      const formData = new FormData();
      files.forEach((file: File) => {
        formData.append("files", file);
      });

      formData.append(
        "extract_api",
        JSON.stringify({
          extractData
        })
      );

      // TODO: Update fetch URL depending on env
      const response = await fetch(
        `http://localhost:8000/api/extract/?session_uid=${sessionId}`,
        {
          method: "POST",
          body: formData
        }
      );

      if (!response.ok) {
        enqueueSnackbar("Something went wrong!", { variant: "error" });
        console.log(response);
      }

      const result = await response.json();
      enqueueSnackbar(result.message, { variant: result.status });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { useTriggerExtractHandler, loading };
};

export default useTriggerExtract;
