import { FC, ChangeEvent, useState } from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./stack-class";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { nanoid } from "nanoid";

export type TElement = {
  value: string;
  state: ElementStates;
};

export const StackPage: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [array, setArray] = useState<TElement[]>([]);
  const [stack] = useState(new Stack<TElement>());
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
  });

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    setInputValue(evt.target.value);
  };

  const delay = (del: number) => {
    return new Promise<void>((res) => setTimeout(res, del));
  };

  const handleClickPush = async () => {
    if (inputValue) {
      setLoader({ ...loader, add: true });
      stack.push({ value: inputValue, state: ElementStates.Changing });
      setArray([...stack.getContainer()]);
      setInputValue("");
      await delay(SHORT_DELAY_IN_MS);
      stack.peak()!.state = ElementStates.Default;
      setArray([...stack.getContainer()]);
      setLoader({ ...loader, add: false });
    }
  };

  const handleClickPop = async () => {
    setLoader({ ...loader, delete: true });
    stack.peak()!.state = ElementStates.Changing;
    setArray([...stack.getContainer()]);
    stack.pop();
    await delay(SHORT_DELAY_IN_MS);
    setArray([...stack.getContainer()]);
    setLoader({ ...loader, delete: false });
  };

  const getPosition = (index: number, arr: TElement[]): string => {
    if (index === arr.length - 1) {
      return "top";
    } else {
      return "";
    }
  };

  const handleClickClear = () => {
    stack.clear();
    setArray([...stack.getContainer()]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.form}>
        <div className={styles.input_container}>
          <Input
            placeholder="Введите текст"
            value={inputValue}
            maxLength={4}
            onChange={onChange}
            isLimitText={true}
            id="stack-input"
          />
          <Button
            text={"Добавить"}
            type="submit"
            onClick={handleClickPush}
            isLoader={loader.add}
            disabled={!inputValue}
          />
          <Button
            text={"Удалить"}
            type="button"
            onClick={handleClickPop}
            isLoader={loader.delete}
            disabled={!array.length}
          />
        </div>
        <Button
          text={"Очистить"}
          type="button"
          onClick={handleClickClear}
          disabled={!array.length}
        />
      </div>
      <ul className={styles.circle_container}>
        {array?.map((item, index) => {
          return (
            <Circle
              key={nanoid()}
              index={index}
              letter={item.value}
              state={item.state}
              head={getPosition(index, array)}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
