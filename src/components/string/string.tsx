import React from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <form className={styles.form}>
        <Input maxLength={11} isLimitText />
        <Button text="Развернуть" />
      </form>
      <ul className={styles.circle_list}>
        <Circle />
      </ul>
    </SolutionLayout>
  );
};
