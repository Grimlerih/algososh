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
import { ArrowIcon } from "../ui/icons/arrow-icon";

export const ListPage: FC = () => {
  const [array, setArray] = useState<IListElement[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [addToHead, setAddToHead] = useState({
    addHead: false,
    button: false,
    displayHead: true,
  });
  const [addToTail, setAddToTail] = useState({
    addTail: false,
    button: false,
    displayTail: true,
  });

  const linkedList = useMemo(() => {
    return new LinkedList<string>(initialArray);
    // eslint-disable-next-line
  }, []);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  // добавление в начало списка
  const handleAddHead = async (input: string) => {
    setAddToHead({ ...addToHead, addHead: true, button: true });
    let element = {
      state: ElementStates.Changing,
      circle: { value: input, state: ElementStates.Default },
      circleBottom: false,
    };
    linkedList.changeElement(0, element);
    setInputValue("");
    setArray([...linkedList.getElements()]);
    setAddToHead({ ...addToHead, displayHead: false });
    await delay(1000);
    linkedList.changeElement(0, { circle: null, state: ElementStates.Default });
    if (array.length === 0) {
      linkedList.changeElement(0, {
        value: input,
        state: ElementStates.Default,
        circle: null,
        circleBottom: false,
      });
    } else {
      linkedList.prepend(input);
    }
    setAddToHead({ ...addToHead });
    setArray([...linkedList.getElements()]);
    await delay(1000);
    linkedList.changeElement(0, { state: ElementStates.Default });
    setArray([...linkedList.getElements()]);
  };

  // добавление в конец списка
  const handleAddTail = async (input: string) => {
    setAddToTail({ ...addToTail, addTail: true, button: true });
    const arr = linkedList.getElements();
    let step = arr.length - 1;
    let changes = {
      circle: { value: input, state: ElementStates.Changing },
      circleBottom: false,
    };
    linkedList.changeElement(step, changes);
    setArray([...linkedList.getElements()]);
    await delay(1000);
    linkedList.changeElement(step, { circle: null });
    linkedList.append({
      value: input,
      state: ElementStates.Modified,
      circle: null,
      circleBottom: false,
    });
    setArray([...linkedList.getElements()]);
    await delay(1000);
    linkedList.changeElement(step + 1, { state: ElementStates.Default });
    setArray([...linkedList.getElements()]);
    setAddToTail({ ...addToTail });
  };

  //удаляем элемент из head
  const handleDeleteHead = async () => {
    const array = linkedList.getElements();
    const temp = array[0];
    setAddToHead({ ...addToHead, button: true, displayHead: true });
    linkedList.changeElement(0, {
      value: "",
      circle: { value: temp.value, state: ElementStates.Changing },
      circleBottom: true,
    });
    setArray([...linkedList.getElements()]);
    await delay(1000);
    linkedList.deleteHead();
    setArray([...linkedList.getElements()]);
    setAddToHead({ ...addToHead });
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
          <Button
            type="button"
            text="Добавить в tail"
            onClick={() => handleAddTail(inputValue!)}
          />
          <Button
            type="button"
            text="Удалить из head"
            onClick={() => handleDeleteHead()}
          />
          <Button type="button" text="Удалить из tail" />
        </div>
        <div className={styles.form__container}>
          <Input type="number" placeholder="Введите индекс" />
          <Button type="button" text="Добавить по индексу" />
          <Button type="button" text="Удалить по индексу" />
        </div>
      </div>
      <ul className={styles.circle_container}>
        {array.map((item, index) => {
          return (
            <div key={nanoid()} className={styles.array_list}>
              <div className={styles.circle_top}>
                {item.circle && item.circleBottom === false && (
                  <Circle
                    letter={item?.circle?.value}
                    state={item.circle?.state}
                    isSmall
                  />
                )}
              </div>
              <Circle
                letter={item.value}
                key={nanoid()}
                state={item.state}
                head={index === 0 && addToHead.displayHead ? "head" : ""}
                tail={
                  array.length - 1 === index && addToTail.displayTail
                    ? "tail"
                    : ""
                }
                index={index}
              />
              <div className={styles.circle_bottom}>
                {item.circle && item.circleBottom && (
                  <Circle
                    letter={item?.circle?.value}
                    state={item.circle?.state}
                    isSmall
                  />
                )}
              </div>
              {array.length - 1 !== index && <ArrowIcon />}
            </div>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
