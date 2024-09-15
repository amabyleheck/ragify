import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface TabProps {
  title: string;
  selected: boolean;
  setActiveTab: (tab: string) => void;
}

const TabItem: React.FC<TabProps> = ({ title, selected, setActiveTab }) => {
  return (
    <Box onClick={() => setActiveTab(title)} className="cursor-pointer">
      <Typography
        variant="body1"
        className={`${selected ? "border-b-[3px] border-black pb-1" : "border-b-none text-gray-400"} cursor-pointer pb-1 text-lg font-medium`}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default TabItem;
