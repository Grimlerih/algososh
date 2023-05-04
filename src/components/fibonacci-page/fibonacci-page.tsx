import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const FibonacciPage: React.FC = () => {
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={}>
        <Input />
        <Button />
      </form>
      <ul className={styles.circle_list}>
        <Circle />;
      </ul>
    </SolutionLayout>
  );
};
