import { Stack } from "@mui/material";
import DragAndDrop from "@/components/DragAndDrop";
import FilesList from "@/components/FilesList";
import BottomContainer from "@/components/BottomContainer";
import { NavigationOption } from "@/utils/consts";
import { NavigationOptionType } from "@/types";

const DocumentsUploadPanel: React.FC = () => {
  return (
    <div className="panel">
      <Stack direction={"column"} spacing={8}>
        <DragAndDrop />
        <FilesList />
        <BottomContainer
          nextPage={NavigationOption.PARAMETERS.title as NavigationOptionType}
        />
      </Stack>
    </div>
  );
};

export default DocumentsUploadPanel;
