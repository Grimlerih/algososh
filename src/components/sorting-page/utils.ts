import { SortTypes } from './sorting-page'
import { ElementStates } from '../../types/element-states'
import { Direction } from "../../types/direction";


export const swap = (arr: SortTypes[] , firstIndex: number, secondIndex: number) => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

const getRandomInteger = (min: number, max: number) => {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
}

export const getRandomArray = () => {
  const min = 3;
  const max = 17;
  let arr = [];
  for (let i = 0; i <= getRandomInteger(min, max); i++)
    arr.push({
      index: Math.floor(Math.random() * 100),
      state: ElementStates.Default,
    });
  return arr;
}

export const testSelectionSort = (
  arr: SortTypes[],
  order: Direction
) => {
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    for (let j = i + 1; j < length; j++) {
      if (
        order === Direction.Ascending
          ? arr[j] < arr[maxInd]
          : arr[j] > arr[maxInd]
      ) {
        maxInd = j;
      }
    }
    swap(arr, maxInd, i);
  }
  return arr;
};

export const testBubbleSort =  (arr: SortTypes[], order: Direction) => {
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      if (
        order === Direction.Ascending
          ? arr[j] > arr[j + 1]
          : arr[j] < arr[j + 1]
      ) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
};