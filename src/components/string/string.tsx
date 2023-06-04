import { useState, ChangeEvent, FormEvent, FC } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

export interface IString {
  symbol: string;
  state: ElementStates;
}

export const StringComponent: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [array, setArray] = useState<IString[]>([]);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const inputArr = Array.from(inputValue);
    const outputArr: IString[] = [];

    setInputValue("");
    setIsLoading(true);

    inputArr.forEach((item) => {
      const value = {
        symbol: item,
        state: ElementStates.Default,
      };
      outputArr.push(value);
    });

    setArray([...outputArr]);

    let firstIndex = 0;
    let secondIndex = inputValue.length - 1;
    let delay = DELAY_IN_MS;

    setTimeout(() => {
      while (firstIndex <= secondIndex) {
        reverseArray(outputArr, delay, firstIndex, secondIndex);
        firstIndex++;
        secondIndex--;
        delay += 1000;
      }
    }, 1000);
  };

  const reverseArray = (
    arr: IString[],
    time: number,
    firstIndex: number,
    secondIndex: number
  ) => {
    console.log(...arr);
    setTimeout(() => {
      arr[firstIndex].state = ElementStates.Changing;
      arr[secondIndex].state = ElementStates.Changing;
      console.log(...arr);

      setArray([...arr]);
    }, time);
    setTimeout(() => {
      swap(arr, firstIndex, secondIndex);
      arr[firstIndex].state = ElementStates.Modified;
      arr[secondIndex].state = ElementStates.Modified;
      console.log(...arr);
      setArray([...arr]);
    }, time + 1000);
    if (firstIndex + 1 === secondIndex || firstIndex === secondIndex) {
      setTimeout(() => {
        setIsLoading(false);
      }, time + 1000);
    }
  };

  const swap = (arr: IString[], firstIndex: number, secondIndex: number) => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          maxLength={11}
          isLimitText
          value={inputValue}
          onChange={onChange}
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={isLoading}
          disabled={!inputValue}
        />
      </form>
      <ul className={styles.circle_list}>
        {array?.map((item, index) => {
          return <Circle state={item.state} letter={item.symbol} key={index} />;
        })}
      </ul>
    </SolutionLayout>
  );
};
