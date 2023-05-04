import { useState, FC, ChangeEvent, FormEvent } from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

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
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input />
        <Button text="Рассчитать" />
      </form>
      <ul className={styles.circle_list}>
        <Circle />;
      </ul>
    </SolutionLayout>
  );
};
