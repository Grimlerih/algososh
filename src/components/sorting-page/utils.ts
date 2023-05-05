import { SortTypes } from './sorting-page'
import { ElementStates } from '../../types/element-states'


export const swap = (arr: SortTypes[] , firstIndex: number, secondIndex: number) => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};


