export type HighlightKind = "compare" | "active" | "success" | "danger";

export interface StepHighlight {
  ids: string[];
  kind: HighlightKind;
}

export interface StepNote {
  text: string;
  tone: "info" | "success" | "danger";
}

export interface Step<TState> {
  state: TState;
  action: string;
  pseudocodeLine?: number;
  highlights?: StepHighlight[];
  note?: StepNote;
}

export type StepGenerator<TInput, TState> = (input: TInput) => Step<TState>[];
