import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface TabProps {
  title?: string;
  selected?: boolean;
  newTab?: boolean;
}

const TabItem: React.FC<TabProps> = ({ title, selected, newTab }) => {
  return (
    <>
      {newTab ? (
        <Box>
          <Typography
            variant="body1"
            className="grey cursor-pointer text-lg font-medium"
          >
            New variable +
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography
            variant="body1"
            className="cursor-pointer border-b-[3px] border-black pb-1 text-lg font-medium"
          >
            {title}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default TabItem;
