import { FC } from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StackPage: FC = () => {
  return (
    <SolutionLayout title="Стек">
      <form className={styles.form}>
        <div className={styles.input_container}>
          <Input placeholder="Введите текст" />
          <Button text={"Добавить"} />
          <Button text={"Удалить"} />
        </div>
        <Button text={"Очистить"} />
      </form>
      <ul className={styles.circle_container}>
        <Circle />
      </ul>
    </SolutionLayout>
  );
};
