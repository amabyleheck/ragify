import {
  ChecksIcon,
  DevIcon,
  FileIcon,
  GraphIcon,
  LayersIcon,
  ShuffleIcon
} from "@/components/Icons";

export const NavigationOption = {
  DOCUMENTS: { id: 0, title: "Documentos", icon: <FileIcon /> },
  VARIABLES: { id: 1, title: "Variáveis", icon: <LayersIcon /> },
  ANNOTATION: { id: 2, title: "Anotação", icon: <ChecksIcon /> },
  RANDOM_ANNOT: { id: 3, title: "Anotação em PDF", icon: <ShuffleIcon /> },
  PARAMETERS: {
    id: 4,
    title: "Parâmetros RAG",
    icon: <DevIcon className="text-gray-400" />
  },
  RESULTS: {
    id: 5,
    title: "Resultados",
    icon: <GraphIcon />
  }
};
