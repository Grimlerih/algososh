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
import { nanoid } from "nanoid";

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
      bubbleSort(array, order);
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

  const bubbleSort = async (arr: SortTypes[], order: Direction) => {
    if (order === Direction.Ascending) {
      setLoader({ ...loader, loader: true, ascending: true });
    } else {
      setLoader({ ...loader, loader: true, descending: true });
    }
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setArray([...array]);
        await new Promise<void>((res) => setTimeout(res, SHORT_DELAY_IN_MS));
        if (
          order === Direction.Ascending
            ? arr[j].index > arr[j + 1].index
            : arr[j].index < arr[j + 1].index
        ) {
          swap(arr, j, j + 1);
        }
        arr[j].state = ElementStates.Default;
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
      setArray([...arr]);
    }
    setLoader({ loader: false, descending: false, ascending: false });
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.form}>
        <div className={styles.radioButtons_container}>
          <RadioInput
            label="Выбор"
            value="selectionSort"
            onChange={onChange}
            defaultChecked
            disabled={loader.loader}
            name="sortType"
          />
          <RadioInput
            label="Пузырёк"
            name="sortType"
            value="bubbleSort"
            onChange={onChange}
            disabled={loader.loader}
          />
        </div>
        <div className={styles.buttons_container}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            onClick={() => handleSort(Direction.Ascending)}
            isLoader={loader.ascending}
            disabled={loader.descending}
          />
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            onClick={() => handleSort(Direction.Descending)}
            isLoader={loader.descending}
            disabled={loader.ascending}
          />
          <Button
            text="Новый массив"
            onClick={() => setArray(getRandomArray())}
            disabled={loader.loader}
          />
        </div>
      </div>
      <ul className={styles.column_list}>
        {array?.map((item) => {
          return (
            <Column key={nanoid()} index={item.index} state={item.state} />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
