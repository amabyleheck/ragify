import {
  ChecksIcon,
  DevIcon,
  FileIcon,
  GraphIcon,
  LayersIcon
} from "@/components/Icons";

export const NavigationOption = {
  DOCUMENTS: { id: 0, title: "Documentos", icon: <FileIcon /> },
  VARIABLES: { id: 1, title: "Variáveis", icon: <LayersIcon /> },
  ANNOTATION: { id: 2, title: "Anotação", icon: <ChecksIcon /> },
  PARAMETERS: {
    id: 3,
    title: "Parâmetros RAG",
    icon: <DevIcon className="text-gray-400" />
  },
  RESULTS: {
    id: 4,
    title: "Resultados",
    icon: <GraphIcon />
  }
};
