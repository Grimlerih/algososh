import { useState, ChangeEvent, FC } from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { swap, getRandomArray } from "./utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export type SortTypes = {
  index: number;
  state: ElementStates;
};

export const SortingPage: FC = () => {
  const [radioValue, setRadioValue] = useState("selectionSort");
  const [array, setArray] = useState<SortTypes[]>(getRandomArray());
  const [loader, setLoader] = useState({
    ascending: false,
    descending: false,
    loader: false,
  });

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(evt.target.value);
  };

  const handleSort = (order: Direction) => {
    if (radioValue === "selectionSort") {
      selectionSort(array, order);
    } else {
      bubbleSort();
    }
  };

  const selectionSort = async (arr: SortTypes[], order: Direction) => {
    if (order === Direction.Ascending) {
      setLoader({ ...loader, loader: true, ascending: true });
    } else {
      setLoader({ ...loader, loader: true, descending: true });
    }
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      let maxInd = i;
      arr[maxInd].state = ElementStates.Changing;
      for (let j = i + 1; j < length; j++) {
        arr[j].state = ElementStates.Changing;
        setArray([...arr]);
        await new Promise<void>((res) => setTimeout(res, SHORT_DELAY_IN_MS));
        if (
          order === Direction.Ascending
            ? arr[j].index < arr[maxInd].index
            : arr[j].index > arr[maxInd].index
        ) {
          maxInd = j;
          arr[j].state = ElementStates.Changing;
          arr[maxInd].state =
            i === maxInd ? ElementStates.Changing : ElementStates.Default;
        }
        if (j !== maxInd) {
          array[j].state = ElementStates.Default;
        }
        setArray([...arr]);
      }
      swap(array, maxInd, i);
      array[maxInd].state = ElementStates.Default;
      array[i].state = ElementStates.Modified;
      setArray([...array]);
    }
    setLoader({ loader: false, descending: false, ascending: false });
  };

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
