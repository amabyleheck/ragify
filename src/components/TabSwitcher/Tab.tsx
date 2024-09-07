import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import EditableTexInput from "../EditableTextInput";

interface TabProps {
  title?: string;
  selected?: boolean;
  setActiveTab: (tab: string) => void;
}

const TabItem: React.FC<TabProps> = ({ title, selected, setActiveTab }) => {
  return (
    <>
      {!title ? (
        <Box>
          <Typography
            variant="body1"
            className="cursor-pointer select-none text-lg font-medium text-gray-200"
          >
            New variable +
          </Typography>
        </Box>
      ) : (
        <Box onClick={() => setActiveTab(title)} className="cursor-pointer">
          <Typography
            variant="body1"
            className={`${selected ? "border-b-[3px] border-black pb-1" : "border-b-none" } cursor-pointer pb-1 text-lg font-medium`}
          >
            <EditableTexInput initialText={title}></EditableTexInput>
          </Typography>
        </Box>
      )}
    </>
  );
};

export default TabItem;
