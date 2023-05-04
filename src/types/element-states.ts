export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

export type ElementTypes = {
  letter: string;
  state: ElementStates;
};