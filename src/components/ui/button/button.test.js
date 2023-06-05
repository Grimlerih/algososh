import React from "react";
import { create } from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";

import { Button } from "./button";

describe("Тест компонента Button", () => {
  it("Пустая кнопка", () => {
    const button = create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Кнопка с текстом", () => {
    const button = create(<Button text="тест" />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Заблокированная кнопка", () => {
    const button = create(<Button disabled />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Кнопка с индикацией загрузки", () => {
    const button = create(<Button isLoader />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("Кнопка c колбеком", () => {
    window.alert = jest.fn();
    render(<Button text="test" onClick={() => alert("callback")} />);
    const button = screen.getByText("test");
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith("callback");
  });
});
