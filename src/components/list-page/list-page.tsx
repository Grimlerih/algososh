import { useState, ChangeEvent, FC, useMemo } from "react";
import styles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { LinkedList, IListElement, IList } from "./list-page-class";
import { initialArray } from "./utils";
import { ElementStates } from "../../types/element-states";
import { delay } from "./utils";
import { nanoid } from "nanoid";

export const ListPage: FC = () => {
  const [array, setArray] = useState<IListElement[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [addToHead, setAddToHead] = useState({
    addHead: false,
    button: false,
  });

  const linkedList = useMemo(() => {
    return new LinkedList<string>(initialArray);
    // eslint-disable-next-line
  }, []);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.form}>
        <div className={styles.form__container}>
          <Input
            maxLength={4}
            isLimitText
            placeholder="Введите значение"
            name="value"
            onChange={onChange}
          />
          <Button
            type="button"
            text="Добавить в head"
            onClick={() => handleAddHead(inputValue!)}
          />
          <Button type="button" text="Добавить в tail" />
          <Button type="button" text="Удалить из head" />
          <Button type="button" text="Удалить из tail" />
        </div>
        <div className={styles.form__container}>
          <Input type="number" placeholder="Введите индекс" />
          <Button type="button" text="Добавить по индексу" />
          <Button type="button" text="Удалить по индексу" />
        </div>
      </div>
      <ul className={styles.circle_container}></ul>
    </SolutionLayout>
  );
};
