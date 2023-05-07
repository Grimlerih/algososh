import React, { useState, ChangeEvent } from "react";
import styles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

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
          <Button type="button" text="Добавить в head" />
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
      <ul className={styles.circle_container}>
        return (
        <Circle />
        );
      </ul>
    </SolutionLayout>
  );
};
