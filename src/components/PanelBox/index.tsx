import { Box } from "@mui/system";
import React from "react";

interface PanelBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  height: number;
}

const PanelBox: React.FC<React.PropsWithChildren<PanelBoxProps>> = ({
  height,
  children
}) => {
  return (
    <Box
      className={`rounded-border max-h-[${height}vh] min-h-[${height}vh] border border-[#DBDBDB] px-[10px] py-[10px]`}
    >
      <Box
        className={`styled-scrollbar flex content-center items-center justify-center max-h-[${height - 2}vh] min-h-[${height - 2}vh] overflow-y-auto px-[10px]`}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PanelBox;
