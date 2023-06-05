import { useState, ChangeEvent, FC, useMemo, useEffect } from "react";
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
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const ListPage: FC = () => {
  const [array, setArray] = useState<IListElement[]>(initialArray);
  const [inputValue, setInputValue] = useState<string>("");
  const [displayHead, setDisplayHead] = useState<boolean>(true);
  const [displayTail, setDisplayTail] = useState<boolean>(true);
  const [indexInputValue, setindexInputValue] = useState<number | string>("");
  const [head, setHead] = useState({
    addHead: false,
    buttonDisable: false,
    buttonLoad: false,
  });
  const [tail, setTail] = useState({
    addTail: false,
    buttonDisable: false,
    buttonLoad: false,
  });
  const [indexState, setindexState] = useState({
    addIndex: false,
    buttonDisable: false,
    buttonDeleteLoad: false,
    buttonAddLoad: false,
  });

  //удаляем элемент по индексу
  const handleDeleteByIndex = async (index: number | string) => {
    const arr = array;
    const inputIndex = Number(index);
    setindexInputValue("");
    setInputValue("");
    setindexState({
      ...indexState,
      buttonDisable: true,
      buttonDeleteLoad: true,
    });
    for (let i = 0; i < arr.length; i++) {
      let changes = {};
      linkedList.changeElement(i, { state: ElementStates.Changing });
      setArray([...linkedList.getElements()]);
      setDisplayTail(false);
      await delay(SHORT_DELAY_IN_MS);
      if (i === inputIndex) {
        changes = {
          state: ElementStates.Default,
          value: "",
          circle: { value: arr[i].value, state: ElementStates.Changing },
          circleBottom: true,
        };
        linkedList.changeElement(i, changes);
        setArray([...linkedList.getElements()]);
        setindexState({ ...indexState });
        await delay(SHORT_DELAY_IN_MS);

        linkedList.deleteByIndex(i);
        setArray([...linkedList.getElements()]);
        setDisplayTail(true);
        setindexState({ ...indexState });
        return;
      }
    }
    setArray([...arr]);
  };

  //добавляем элемент по индексу
  const handleAddByIndex = async (index: number | string, input: string) => {
    const arr = linkedList.getElements();
    const indexInput = Number(index);
    setindexInputValue("");
    setInputValue("");
    setindexState({ ...indexState, buttonDisable: true, buttonAddLoad: true });
    setDisplayHead(false);

    for (let i = 0; i < arr.length; i++) {
      if (indexInput !== i) {
        let changes = {
          state: ElementStates.Changing,
          circle: { value: input, state: ElementStates.Default },
        };
        linkedList.changeElement(i, changes);
        setArray([...linkedList.getElements()]);
        setindexState({ ...indexState, addIndex: false });
        await delay(SHORT_DELAY_IN_MS);
        linkedList.changeElement(i, { circle: null });
        setArray([...linkedList.getElements()]);
      } else {
        let element = {
          circle: { value: input, state: ElementStates.Changing },
        };
        linkedList.changeElement(indexInput, element);
        setArray([...linkedList.getElements()]);
        await delay(SHORT_DELAY_IN_MS);
        linkedList.changeElement(indexInput, { circle: null });
        setArray([...linkedList.getElements()]);
        linkedList.addByIndex(indexInput, input);
        setArray([...linkedList.getElements()]);
        linkedList.changeElement(i, { state: ElementStates.Modified });
        setArray([...linkedList.getElements()]);
        setindexState({ ...indexState });
        await delay(SHORT_DELAY_IN_MS);
        linkedList.changeElement(i, { state: ElementStates.Default });
        setArray([...linkedList.getElements()]);
        setDisplayHead(true);
        setindexState({ ...indexState });
        return;
      }
    }
  };

  const linkedList = useMemo(() => {
    return new LinkedList<string>(initialArray);
    // eslint-disable-next-line
  }, []);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const inputIndexOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setindexInputValue(evt.target.value);
  };

  // добавление в начало списка
  const handleAddHead = async (input: string) => {
    setHead({ ...head, addHead: true, buttonDisable: true });
    setInputValue("");
    let element = {
      state: ElementStates.Changing,
      circle: { value: input, state: ElementStates.Default },
      circleBottom: false,
    };
    linkedList.changeElement(0, element);
    setArray([...linkedList.getElements()]);
    setDisplayHead(false);
    setHead({ ...head });
    await delay(SHORT_DELAY_IN_MS);
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
    setHead({ ...head });
    setArray([...linkedList.getElements()]);
    await delay(SHORT_DELAY_IN_MS);
    linkedList.changeElement(0, { state: ElementStates.Default });
    setDisplayHead(true);
    setArray([...linkedList.getElements()]);
  };

  // добавление в конец списка
  const handleAddTail = async (input: string) => {
    setTail({ ...tail, addTail: true, buttonDisable: true });
    setInputValue("");
    const arr = linkedList.getElements();
    let step = arr.length - 1;
    let changes = {
      circle: { value: input, state: ElementStates.Changing },
      circleBottom: false,
    };
    linkedList.changeElement(step, changes);
    setArray([...linkedList.getElements()]);
    await delay(SHORT_DELAY_IN_MS);
    linkedList.changeElement(step, { circle: null });
    linkedList.append({
      value: input,
      state: ElementStates.Modified,
      circle: null,
      circleBottom: false,
    });
    setArray([...linkedList.getElements()]);
    await delay(SHORT_DELAY_IN_MS);
    linkedList.changeElement(step + 1, { state: ElementStates.Default });
    setArray([...linkedList.getElements()]);
    setTail({ ...tail });
  };

  //удаляем элемент из head
  const handleDeleteHead = async () => {
    const array = linkedList.getElements();
    const temp = array[0];
    setHead({ ...head, buttonDisable: true, buttonLoad: true });
    linkedList.changeElement(0, {
      value: "",
      circle: { value: temp.value, state: ElementStates.Changing },
      circleBottom: true,
    });
    setArray([...linkedList.getElements()]);
    await delay(SHORT_DELAY_IN_MS);
    linkedList.deleteHead();
    setArray([...linkedList.getElements()]);
    setHead({ ...head });
  };

  //удаляем элемент из tail
  const handleDeleteTail = async () => {
    const arr = linkedList.getElements();
    setDisplayTail(false);
    setTail({ ...tail, buttonDisable: true, buttonLoad: true });
    const temp = arr[arr.length - 1];
    const changes = {
      value: "",
      circle: { value: temp.value, state: ElementStates.Changing },
      circleBottom: true,
    };
    linkedList.changeElement(arr.length - 1, changes);
    setArray([...linkedList.getElements()]);
    setTail({ ...tail, buttonLoad: true });
    await delay(SHORT_DELAY_IN_MS);
    linkedList.deleteTail();
    setArray([...linkedList.getElements()]);
    setDisplayTail(true);
    setTail({ ...tail });
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
            value={inputValue}
          />
          <Button
            type="button"
            text="Добавить в head"
            data="add-button"
            disabled={inputValue && !head.buttonDisable ? false : true}
            onClick={() => handleAddHead(inputValue!)}
          />
          <Button
            type="button"
            text="Добавить в tail"
            data="add-button"
            disabled={inputValue && !tail.buttonDisable ? false : true}
            onClick={() => handleAddTail(inputValue!)}
          />
          <Button
            type="button"
            text="Удалить из head"
            data="delete-button"
            isLoader={head.buttonLoad}
            disabled={array.length > 0 && !head.buttonDisable ? false : true}
            onClick={() => handleDeleteHead()}
          />
          <Button
            type="button"
            text="Удалить из tail"
            data="delete-button"
            isLoader={tail.buttonLoad}
            disabled={array.length > 0 && !tail.buttonDisable ? false : true}
            onClick={() => handleDeleteTail()}
          />
        </div>
        <div className={styles.form__container}>
          <Input
            type="number"
            placeholder="Введите индекс"
            onChange={inputIndexOnChange}
            value={indexInputValue}
          />

          <Button
            type="button"
            text="Добавить по индексу"
            data="add-button"
            disabled={
              (indexInputValue as number) <= array.length - 1 &&
              (indexInputValue as number) >= 0 &&
              indexInputValue &&
              !indexState.buttonDisable
                ? false
                : true
            }
            isLoader={indexState.buttonAddLoad}
            onClick={() => handleAddByIndex(indexInputValue!, inputValue!)}
          />
          <Button
            type="button"
            text="Удалить по индексу"
            data="delete-button"
            disabled={
              (indexInputValue as number) <= array.length - 1 &&
              (indexInputValue as number) >= 0 &&
              indexInputValue &&
              !indexState.buttonDisable
                ? false
                : true
            }
            isLoader={indexState.buttonDeleteLoad}
            onClick={() => handleDeleteByIndex(indexInputValue!)}
          />
        </div>
      </div>
      <ul className={styles.circle_container}>
        {array?.map((item, index) => {
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
                head={index === 0 && displayHead ? "head" : ""}
                tail={array.length - 1 === index && displayTail ? "tail" : ""}
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
