import { Stack, Typography } from "@mui/material";
import TabSwitcher from "@/components/TabSwitcher";
import FilesList from "@/components/FilesList";

const VariablesAnnotationPanel: React.FC = () => {
  return (
    <div className="panel">
      <Stack direction={"column"} spacing={5}>
        <Stack direction={"column"} spacing={3}>
          <Typography variant="h1" fontWeight={800} align="left" fontSize={25}>
            Annotate Variables
          </Typography>
          <TabSwitcher tabs={["Variable 1", "Variable 2"]} />
        </Stack>
        <FilesList />
      </Stack>
    </div>
  );
};

export default VariablesAnnotationPanel;
