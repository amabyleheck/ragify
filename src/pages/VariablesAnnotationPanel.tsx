import { Stack, TextareaAutosize, TextField, Typography } from "@mui/material";
import TabSwitcher from "@/components/TabSwitcher";
import FilesList from "@/components/FilesList";
import BottomContainer from "@/components/BottomContainer";
import { NavigationOption } from "@/utils/consts";
import { NavigationOptionType } from "@/types";
import PanelBox from "@/components/PanelBox";
import { InfoOutlined } from "@mui/icons-material";

const VariablesAnnotationPanel: React.FC = () => {
  return (
    <div className="panel">
      <Stack direction={"column"} spacing={3}>
        <Stack direction={"column"} spacing={3}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography
              variant="h1"
              fontWeight={800}
              align="left"
              fontSize={25}
            >
              Annotate Variables
            </Typography>
            <InfoOutlined fontSize="small" />
          </Stack>
          <TabSwitcher tabs={["Variable 1", "Variable 2"]} />
          <Stack direction={"column"} spacing={1}>
            <Typography
              variant="h5"
              fontWeight={800}
              align="left"
              fontSize={20}
            >
              Prompt
            </Typography>
            <TextareaAutosize
              className="styled-scrollbar rounded-border size-full overflow-y-auto border border-[#DBDBDB] p-2 focus:border-[#DBDBDB]"
              style={{ height: "15vh" }}
            />
          </Stack>
        </Stack>
        <FilesList />
        <BottomContainer
          nextPage={NavigationOption.PARAMETERS.title as NavigationOptionType}
        />
      </Stack>
    </div>
  );
};

export default VariablesAnnotationPanel;
