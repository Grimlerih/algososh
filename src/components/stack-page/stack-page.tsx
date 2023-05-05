import { FC, ChangeEvent, useState } from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export type TElement = {
  value: string;
  color: ElementStates;
};

export const StackPage: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [array, setArray] = useState<TElement[]>([]);
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
  });

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const handleClickPush = () => {
    if (inputValue) {
      setLoader({ ...loader, add: true });
    }
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form}>
        <div className={styles.input_container}>
          <Input
            placeholder="Введите текст"
            value={inputValue}
            maxLength={4}
            onChange={onChange}
          />
          <Button text={"Добавить"} />
          <Button text={"Удалить"} />
        </div>
        <Button text={"Очистить"} />
      </form>
      <ul className={styles.circle_container}>
        <Circle />
      </ul>
    </SolutionLayout>
  );
};
