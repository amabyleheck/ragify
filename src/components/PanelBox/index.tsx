import { Box } from "@mui/system";
import React from "react";

interface PanelBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  height: number;
}

const PanelBox: React.FC<React.PropsWithChildren<PanelBoxProps>> = ({
  className,
  height,
  children
}) => {
  return (
    <Box
      className={`rounded-border border border-[#DBDBDB] px-[10px] py-[10px] ${className ? className : ""}`}
      sx={{
        height: `${height}vh`
      }}
    >
      <Box
        className={`styled-scrollbar flex content-center items-center justify-center h-[${height - 2}vh] overflow-y-auto px-[10px]`}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PanelBox;
