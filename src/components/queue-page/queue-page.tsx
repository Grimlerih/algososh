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

  const delay = (del: number) => {
    return new Promise<void>((res) => setTimeout(res, del));
  };

  const handleClickEnqueue = async () => {
    if (inputValue) {
      setLoader({ ...loader, add: true });
      queue.enqueue({ value: inputValue, state: ElementStates.Changing });
      setInputValue("");
      setArray([...queue.getContainer()]);
      await delay(SHORT_DELAY_IN_MS);
      queue.getContainer()[queue.getTail() - 1].state = ElementStates.Default;
      setArray([...queue.getContainer()]);
      setLoader({ ...loader, add: false });
    }
  };

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };
  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form}>
        <div className={styles.input_container}>
          <Input placeholder="Введите текст" onChange={onChange} />
          <Button text={"Добавить"} onClick={handleClickEnqueue} />
          <Button text={"Удалить"} />
        </div>
        <Button text={"Очистить"} />
      </form>
      <ul className={styles.circle_container}>
        <Circle key={nanoid()} />
      </ul>
    </SolutionLayout>
  );
};
