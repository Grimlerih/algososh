import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";

export const SortingPage: React.FC = () => {
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.}>
        <div className={styles.}>
          <RadioInput label="Выбор" />
          <RadioInput label="Пузырёк" />
        </div>
        <div className={styles.}>
          <Button text="По возрастанию" />
          <Button text="По убыванию" />
          <Button text="Новый массив" />
        </div>
      </div>
      <ul className={styles.}>
        {array?.map((item) => {
          return <Column />;
        })}
      </ul>
    </SolutionLayout>
  );
};
