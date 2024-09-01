import styled from "@emotion/styled";
import { zodResolver } from "@hookform/resolvers/zod";
import CloudUploadIcon from "@mui/icons-material/FileUploadOutlined";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import UploadedFilesGrid from "@/components/UploadedFilesGrid";
import { NavigationOption } from "@/utils/consts";
import {
  NewUploadedFileFormData,
  newUploadedFileSchema,
} from "@/forms/FileUploadForm";

interface Props {
  onSwitch: React.Dispatch<React.SetStateAction<string>>;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function DocumentsUploadPanel(props: Props) {
  const {
    formState: { errors },
    setValue,
    getValues,
  } = useForm<NewUploadedFileFormData>({
    resolver: zodResolver(newUploadedFileSchema),
    defaultValues: { uploadedFiles: undefined },
  });

  return (
    <div className="panel">
      <Stack direction={"column"} spacing={5}>
        <Stack spacing={1}>
          <Typography variant="h5" fontWeight={800} align="left" fontSize={20}>
            Upload documents
          </Typography>
          <Button
            component="label"
            tabIndex={-1}
            sx={{ margin: 0, padding: 0, ":hover": { borderRadius: "15px" } }}
            onDrag={(e) => console.log(e)}
            onDrop={(e) => console.log(e)}
          >
            <Box
              className="rounded-border"
              sx={{
                border: "2px dotted #DBDBDB",
                minWidth: "100%",
                minHeight: "20vh",
                alignContent: "center",
              }}
            >
              <CloudUploadIcon sx={{ fontSize: "10vh", color: "#EBEBEB" }} />
              <Typography
                variant="h5"
                fontWeight={800}
                align="center"
                fontSize={18}
                color={"black"}
                textTransform={"none"}
              >
                Drag and drop your documents
              </Typography>
              <Typography
                variant="h6"
                fontWeight={300}
                align="center"
                marginBottom={3}
                fontSize={15}
                color={"black"}
                textTransform={"none"}
              >
                Only .pdf documents are allowed
                {errors.uploadedFiles?.message}
              </Typography>
              <VisuallyHiddenInput
                type="file"
                multiple={true}
                onChange={(args) => {
                  args.target.files &&
                    setValue("uploadedFiles", args.target.files, {
                      shouldValidate: true,
                    });
                  console.log(getValues());
                }}
              />
            </Box>
          </Button>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h5" fontWeight={800} align="left" fontSize={20}>
            List of documents
          </Typography>
          <UploadedFilesGrid files={[]} />
        </Stack>
        <Stack direction={"row"} justifyContent={"flex-end"} spacing={2}>
          <Button type="button" variant="outlined" tabIndex={-1}>
            Discard
          </Button>
          <Button
            type="button"
            variant="contained"
            tabIndex={-1}
            onClick={() => props.onSwitch(NavigationOption.VARIABLES.title)}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}

export default DocumentsUploadPanel;
