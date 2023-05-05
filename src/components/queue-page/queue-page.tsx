import { useState, FC, ChangeEvent } from "react";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { nanoid } from "nanoid";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Queue } from "./queue-class";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export type TElement = {
  value: string;
  state: ElementStates;
};

export const QueuePage: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [queue] = useState(new Queue<TElement>(7));
  const [array, setArray] = useState<TElement[]>([]);
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
  });

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const delay = (del: number) => {
    return new Promise<void>((res) => setTimeout(res, del));
  };

  const handleClickEnqueue = async () => {
    setLoader({ ...loader, add: true });
    queue.enqueue({ value: inputValue, state: ElementStates.Changing });
    setArray([...queue.getContainer()]);
    await delay(SHORT_DELAY_IN_MS);
    queue.getContainer()[queue.getTail() - 1].state = ElementStates.Default;
    setArray([...queue.getContainer()]);
    setLoader({ ...loader, add: false });
    setInputValue("");
  };

  const handleClickDequeue = async () => {
    setLoader({ ...loader, delete: true });
    queue.getContainer()[queue.getHead()].value = ElementStates.Changing;
    setArray([...queue.getContainer()]);
    await delay(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setArray([...queue.getContainer()]);
    setLoader({ ...loader, delete: false });
  };

  const handleClickClear = () => {
    queue.clear();
    setArray([...queue.getContainer()]);
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form}>
        <div className={styles.input_container}>
          <Input
            placeholder="Введите текст"
            onChange={onChange}
            value={inputValue}
          />
          <Button
            text={"Добавить"}
            onClick={handleClickEnqueue}
            disabled={loader.delete || !inputValue || queue.isFullQueue()}
            isLoader={loader.add}
          />
          <Button
            text={"Удалить"}
            onClick={handleClickDequeue}
            isLoader={loader.delete}
            disabled={loader.add || !!queue.isEmpty()}
          />
        </div>
        <Button text={"Очистить"} onClick={handleClickClear} />
      </form>
      <ul className={styles.circle_container}>
        {array.map((item, index) => {
          return (
            <Circle
              key={nanoid()}
              index={index}
              letter={item.value}
              state={item.state}
              head={index === queue.getHead() && !queue.isEmpty() ? "head" : ""}
              tail={
                index === queue.getTail() - 1 && !queue.isEmpty() ? "tail" : ""
              }
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
