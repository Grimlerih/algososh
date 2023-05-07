import { ElementStates } from "../../types/element-states";

export interface IListElement {
  value?: string | number;
  state?: ElementStates;
  circle?: null | {
    value?: string | number;
    state?: ElementStates;
  };
  circleBottom?: boolean;
}

export interface IList<T> {
    setContainer: (data: IListElement[]) => void;
    getElements: () => IListElement[];
    changeElement: (i: number, data: IListElement) => void;
    addByIndex: (index: number, input: string | number) => void;
    deleteByIndex: (index: number) => void;
    prepend: (input: string | number) => void;
    append: (input: IListElement) => void;
    deleteTail: () => void;
    deleteHead: () => void;
  }

class LinkedList<T> implements IList<T> {
  private container: IListElement[];

  constructor(initialData?: IListElement[]) {
    if (initialData) {
      this.container = [...initialData];
    } else {
      this.container = [];
    }
  }

  setContainer = (data: IListElement[]) => {
    this.container = [...data];
  };

  getElements = () => {
    const arr = [];
    for (let i = 0; i < this.container.length; i++) {
      arr.push(this.container[i]);
    }
    return arr;
  };

  changeElement = (index: number, data: IListElement) => {
    this.container[index] = { ...this.container[index], ...data };
  };

  addByIndex = async (index: number, input: string | number) => {
    const arr = this.container;
    arr.splice(index, 0, {
      ...arr[index],
      value: input,
    });
    arr.forEach((item) => (item.state = ElementStates.Default));
    this.container = [...arr];
  };

  deleteByIndex = async (index: number) => {
    const arr = this.container;
    arr.splice(index, 1);
    arr.forEach((item) => (item.state = ElementStates.Default));
    this.container = [...arr];
  };

  prepend = async (input: string | number) => {
    const arr = this.container;

    arr.unshift({
      value: input,
      state: ElementStates.Default,
      circle: null,
      circleBottom: false,
    });
    this.container = [...arr];
  };

  append = (input: IListElement) => {
    this.container.push(input);
  };

  deleteTail = () => {
    const arr = this.container;
    arr.splice(arr.length - 1, 1);
    this.container = [...arr];
  };

  deleteHead = () => {
    const arr = this.container;
    arr.splice(0, 1);
    this.container = [...arr];
  };
}

export { LinkedList };