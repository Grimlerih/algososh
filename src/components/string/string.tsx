import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

interface IString {
  symbol: string;
  state: ElementStates;
}

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [array, setArray] = useState<IString[]>([]);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const firstIndex = 0;
    const secondIndex = inputValue.length - 1;

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
        <Button text="Развернуть" />
      </form>
      <ul className={styles.circle_list}>
        <Circle />
      </ul>
    </SolutionLayout>
  );
};
