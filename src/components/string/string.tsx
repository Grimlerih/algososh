import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  };

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          maxLength={11}
          isLimitText
          value={inputValue}
          onChange={onChange}
        />
        <Button text="Развернуть" />
      </form>
      <ul className={styles.circle_list}>
        <Circle />
      </ul>
    </SolutionLayout>
  );
};
