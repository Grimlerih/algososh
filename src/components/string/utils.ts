import { IString } from './string'
import { ElementStates } from '../../types/element-states'

const swap = (arr: IString[], firstIndex: number, secondIndex: number) => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const testReverseString = (arr: string) => {
  const inputArr = Array.from(arr);
  const outputArr: IString[] = [];

  inputArr.forEach((item) => {
    const value = {
      symbol: item,
      state: ElementStates.Default,
    };
    outputArr.push(value);
  });

  let firstIndex = 0;
  let secondIndex = arr.length - 1;
  while (firstIndex <= secondIndex) {
    swap(outputArr, firstIndex, secondIndex);
    firstIndex++;
    secondIndex--;
}

const array = outputArr.map(obj => Object.entries(obj)
.filter(entry => entry[0] === "symbol")
.map(entry => entry[1])
.join(""));

  return array
}