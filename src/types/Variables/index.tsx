export const VariableLabel = {
  ZERO_SHOT: { name: "Zero Shot", color: "#FFC107" },
  ONE_SHOT: { name: "One Shot", color: "#FFC107" },
  FEW_SHOT: { name: "Few Shot", color: "#FFC107" },
  CHAIN_OF_THOUGHT: { name: "Chain of Thought", color: "#FFC107" }
};

export type VariableLabelType = keyof typeof VariableLabel;

export interface Variable {
  name: string;
  prompt: string;
  label?: VariableLabelType;
}
