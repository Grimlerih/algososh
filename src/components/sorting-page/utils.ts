import { SortTypes } from './sorting-page'
import { ElementStates } from '../../types/element-states'


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

