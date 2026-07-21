import type { ComponentType } from "react";

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

export interface CanvasProps<TState> {
  step: Step<TState>;
}

export interface InputPanelProps<TInput> {
  defaultInput: TInput;
  onRun: (input: TInput) => void;
}

export interface VisualizerModule<TInput, TState> {
  slug: string;
  title: string;
  description: string;
  chapter: string;
  badge: string;
  pseudocode: string[];
  defaultInput: TInput;
  // Step generation now lives on the backend (api/src/visualizer); unused client-side.
  generateSteps?: StepGenerator<TInput, TState>;
  Canvas: ComponentType<CanvasProps<TState>>;
  InputPanel: ComponentType<InputPanelProps<TInput>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyVisualizerModule = VisualizerModule<any, any>;

export function getHighlightKind(
  step: Step<unknown>,
  id: string,
): HighlightKind | undefined {
  return step.highlights?.find((h) => h.ids.includes(id))?.kind;
}
