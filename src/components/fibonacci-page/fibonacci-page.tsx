import { useState, FC, ChangeEvent, FormEvent } from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: FC = () => {
  const [inputValue, setInputValue] = useState<number | string>("");
  const [loader, setLoader] = useState(false);
  const [array, setArray] = useState<number[]>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const fib = (n: number): number[] => {
    let arr: number[] = [1, 1];
    for (let i = 2; i < n + 1; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);
    const fibArray = fib(Number(inputValue));
    for (let i = 0; i < fibArray.length; i++) {
      await new Promise<void>((res) => setTimeout(res, SHORT_DELAY_IN_MS));
      setArray(fibArray.slice(0, i + 1));
    }
    setInputValue("");
    setLoader(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          type="number"
          value={inputValue}
          max={19}
          min={1}
          isLimitText
          onChange={onChange}
        />
        <Button
          text="Рассчитать"
          isLoader={loader}
          type="submit"
          disabled={
            Number(inputValue)! <= 19 && Number(inputValue)! >= 1 ? false : true
          }
        />
      </form>
      <ul className={styles.circle_list}>
        {array?.map((item, index) => {
          return <Circle letter={String(item)} index={index} key={index} />;
        })}
      </ul>
    </SolutionLayout>
  );
};
