import Checks from "@/app/icons/checks.svg";
import ChevronSide from "@/app/icons/chevron.svg";
import Dev from "@/app/icons/code.svg";
import File from "@/app/icons/file.svg";
import Graph from "@/app/icons/graph.svg";
import Layers from "@/app/icons/layers.svg";
import { createSvgIcon } from "@mui/material/utils";
import { SvgIconProps } from "@mui/material/SvgIcon";

interface CustomSvgProps extends SvgIconProps {
  Icon: React.FC;
  name: string;
  clickable?: boolean;
  stroke?: string;
}

const CustomIcon: React.FC<CustomSvgProps> = ({
  stroke,
  Icon,
  name,
  clickable,
  ...props
}) => {
  const CustomIconComponent = createSvgIcon(<Icon />, name);
  const strokeColor = stroke ? `text-${stroke}-400` : "text-black";
  const cursor = clickable ? "cursor-pointer" : "";
  return (
    <CustomIconComponent
      className={`stroke-round stroke-current ${strokeColor} ${cursor}`}
      style={{ strokeLinejoin: "round", strokeWidth: "1.5" }}
      {...props}
    />
  );
};

interface CustomIconProps extends SvgIconProps {
  clickable?: boolean;
  stroke?: string;
}

export const ChecksIcon: React.FC<CustomIconProps> = ({ ...props }) => {
  return <CustomIcon Icon={Checks} name={"Checks"} {...props} />;
};

export const ChevronIcon: React.FC<CustomIconProps> = ({ ...props }) => {
  return <CustomIcon Icon={ChevronSide} name={"Checks"} {...props} />;
};

export const DevIcon: React.FC<CustomIconProps> = ({
  stroke,
  clickable,
  ...props
}) => {
  const CustomIconComponent = createSvgIcon(
    <Dev className="fill-current" />,
    "Dev"
  );
  const color = stroke ? `text-${stroke}-400` : "text-black";
  const cursor = clickable ? "cursor-pointer" : "";
  return <CustomIconComponent className={`${color} ${cursor}`} {...props} />;
};

export const FileIcon: React.FC<CustomIconProps> = ({ ...props }) => {
  return <CustomIcon Icon={File} name={"File"} {...props} />;
};

export const GraphIcon: React.FC<CustomIconProps> = ({ ...props }) => {
  return <CustomIcon Icon={Graph} name={"Graph"} {...props} />;
};

export const LayersIcon: React.FC<CustomIconProps> = ({ ...props }) => {
  return <CustomIcon Icon={Layers} name={"Layers"} {...props} />;
};
