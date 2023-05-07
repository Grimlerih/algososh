import { ElementStates } from '../../types/element-states'

export const initialArray = [
  {
    value: "0",
    state: ElementStates.Default,
    circle: null,
    circleBottom: false,
  },
  {
    value: "34",
    state: ElementStates.Default,
    circle: null,
    circleBottom: false,
  },
  {
    value: "8",
    state: ElementStates.Default,
    circle: null,
    circleBottom: false,
  },
  {
    value: "1",
    state: ElementStates.Default,
    circle: null,
    circleBottom: false,
  },
];

export const delay = (del: number) => {
  return new Promise<void>((res) => setTimeout(res, del));
};