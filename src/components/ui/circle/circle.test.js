import { create } from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";

import { Circle } from "./circle";

describe("Тест компонента Circle", () => {
  it("Circle без буквы", () => {
    const circle = create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle с буквами", () => {
    const circle = create(<Circle letter={"test"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle с head", () => {
    const circle = create(<Circle head={"test"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle с react-элементом в head", () => {
    const circle = create(<Circle head={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle с tail", () => {
    const circle = create(<Circle tail={"test"} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle с react-элементом в tail", () => {
    const circle = create(<Circle tail={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle с index", () => {
    const circle = create(<Circle index={1} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle с пропом isSmall ===  true", () => {
    const circle = create(<Circle isSmall />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle в состоянии default", () => {
    const circle = create(<Circle state={ElementStates.Default} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle в состоянии changing", () => {
    const circle = create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it("Circle в состоянии modified", () => {
    const circle = create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
});
