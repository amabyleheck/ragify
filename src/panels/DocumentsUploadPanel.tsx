import { Stack } from "@mui/material";
import DragAndDrop from "@/components/DragAndDrop";
import FilesList from "@/components/FilesList";
import BottomContainer from "@/components/BottomContainer";
import { NavigationOption } from "@/utils/consts";
import { NavigationOptionType } from "@/types";

const DocumentsUploadPanel: React.FC = () => {
  return (
    <div className="panel">
      <Stack
        direction={"column"}
        spacing={5}
        height={"100%"}
        justifyContent={"space-between"}
      >
        <DragAndDrop />
        <FilesList annotation={false} />
        <BottomContainer
          nextPage={NavigationOption.VARIABLES.title as NavigationOptionType}
        />
      </Stack>
    </div>
  );
};

export default DocumentsUploadPanel;
