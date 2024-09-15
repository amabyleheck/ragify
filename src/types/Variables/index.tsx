export const VariableLabel = {
  ZERO_SHOT: { name: "Zero Shot", color: "#FF5722" },
  ONE_SHOT: { name: "One Shot", color: "#4CAF50" },
  FEW_SHOT: { name: "Few Shot", color: "#2196F3" },
  CHAIN_OF_THOUGHT: { name: "Chain of Thought", color: "#FFC107" }
};

export type VariableLabelType = keyof typeof VariableLabel;

export interface Variable {
  name: string;
  prompt?: string;
  label?: VariableLabelType;
}
