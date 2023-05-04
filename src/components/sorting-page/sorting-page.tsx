import { useState, ChangeEvent, FC } from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";

export const SortingPage: FC = () => {
  const [radioValue, setRadioValue] = useState("selectionSort");

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(evt.target.value);
  };

  const handleSort = (order: Direction) => {
    if (radioValue === "selectionSort") {
      selectionSort();
    } else {
      bubbleSort();
    }
  };

  const selectionSort = () => {};

  const bubbleSort = () => {};

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.form}>
        <div className={styles.radioButtons_container}>
          <RadioInput
            label="Выбор"
            value="selectionSort"
            onChange={onChange}
            defaultChecked
          />
          <RadioInput label="Пузырёк" value="bubbleSort" onChange={onChange} />
        </div>
        <div className={styles.buttons_container}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            onClick={() => handleSort(Direction.Ascending)}
          />
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            onClick={() => handleSort(Direction.Descending)}
          />
          <Button text="Новый массив" />
        </div>
      </div>
      <ul className={styles.column_list}></ul>
    </SolutionLayout>
  );
};
