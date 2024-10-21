import { GlobalContext } from "@/contexts/global";
import { NavigationOption } from "@/utils/consts";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext } from "react";
import {
  ChecksIcon,
  ChevronIcon,
  DevIcon,
  FileIcon,
  GraphIcon,
  LayersIcon
} from "@/components/Icons";

const PageTracker: React.FC = () => {
  const { pageType, setPageType } = useContext(GlobalContext);
  const componentMap = pageTrackerMapper(setPageType);

  const CurrentPage = componentMap[pageType];

  return (
    <div className="absolute left-0 top-0 p-5">
      <Stack
        direction={"row"}
        gap={1}
        alignContent={"center"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <CurrentPage />
      </Stack>
    </div>
  );
};

export default PageTracker;

interface SectionProps {
  original?: boolean;
}

const pageTrackerMapper = (setPageType: (value: string) => void) => {
  const ArrowIcon: React.JSX.Element = (
    <ChevronIcon fontSize={"small"} stroke={"gray"} />
  );

  const DocumentsSection: React.FC<SectionProps> = ({ original = true }) => {
    return (
      <>
        <FileIcon
          fontSize={"small"}
          stroke={"gray"}
          onClick={() => setPageType(NavigationOption.DOCUMENTS.title)}
          clickable
        />
        {original && (
          <Typography fontSize={15} className="text-gray-400">
            Carregando Documentos
          </Typography>
        )}
      </>
    );
  };

  const VariablesSection: React.FC<SectionProps> = ({ original = true }) => {
    return (
      <>
        <DocumentsSection original={false} />
        {ArrowIcon}
        <LayersIcon
          fontSize={"small"}
          stroke={"gray"}
          onClick={() => setPageType(NavigationOption.VARIABLES.title)}
          clickable
        />
        {original && (
          <Typography fontSize={15} className="text-gray-400">
            Definindo Variáveis
          </Typography>
        )}
      </>
    );
  };

  const AnnotationSection: React.FC<SectionProps> = ({ original = true }) => {
    return (
      <>
        <VariablesSection original={false} />
        {ArrowIcon}
        <ChecksIcon
          fontSize={"small"}
          stroke={"gray"}
          onClick={() => setPageType(NavigationOption.ANNOTATION.title)}
          clickable
        />
        {original && (
          <Typography fontSize={15} className="text-gray-400">
            Anotando Variáveis
          </Typography>
        )}
      </>
    );
  };

  const ParametersSection: React.FC<SectionProps> = ({ original = true }) => {
    return (
      <>
        <AnnotationSection original={false} />
        {ArrowIcon}
        <DevIcon
          fontSize={"small"}
          stroke={"gray"}
          onClick={() => setPageType(NavigationOption.PARAMETERS.title)}
          clickable
        />
        {original && (
          <Typography fontSize={15} className="text-gray-400">
            Configurando Parâmetros
          </Typography>
        )}
      </>
    );
  };

  const ResultsSection: React.FC<SectionProps> = () => {
    return (
      <>
        <ParametersSection original={false} />
        {ArrowIcon}
        <GraphIcon
          fontSize={"small"}
          stroke={"gray"}
          onClick={() => setPageType(NavigationOption.RESULTS.title)}
          clickable
        />
        <Typography fontSize={15} className="text-gray-400">
          Resultados
        </Typography>
      </>
    );
  };

  return {
    [NavigationOption.DOCUMENTS.title]: DocumentsSection,
    [NavigationOption.VARIABLES.title]: VariablesSection,
    [NavigationOption.ANNOTATION.title]: AnnotationSection,
    [NavigationOption.PARAMETERS.title]: ParametersSection,
    [NavigationOption.RESULTS.title]: ResultsSection
  };
};
