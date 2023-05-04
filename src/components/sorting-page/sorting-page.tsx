import React from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";

export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.form}>
        <div className={styles.radioButtons_container}>
          <RadioInput label="Выбор" />
          <RadioInput label="Пузырёк" />
        </div>
        <div className={styles.buttons_container}>
          <Button text="По возрастанию" />
          <Button text="По убыванию" />
          <Button text="Новый массив" />
        </div>
      </div>
      <ul className={styles.column_list}></ul>
    </SolutionLayout>
  );
};
