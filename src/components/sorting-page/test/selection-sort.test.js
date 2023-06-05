import { testSelectionSort } from "../utils";
import { Direction } from "../../../types/direction";

describe("Тест алгоритма сортировки выбором", () => {
  it("Сортировка пустого массива по возрастанию", () => {
    expect(testSelectionSort([], Direction.Ascending)).toEqual([]);
  });
  it("Сортировка пустого массива по убыванию", () => {
    expect(testSelectionSort([], Direction.Descending)).toEqual([]);
  });
  it("Сортировка массива из одного элемента по возрастанию", () => {
    expect(testSelectionSort([1], Direction.Ascending)).toEqual([1]);
  });
  it("Сортировка массива из одного элемента по убыванию", () => {
    expect(testSelectionSort([1], Direction.Descending)).toEqual([1]);
  });
  it("Сортировка массива из нескольких элементов по возрастанию", () => {
    expect(testSelectionSort([2, 1, 6, 0, 9], Direction.Ascending)).toEqual([
      0, 1, 2, 6, 9,
    ]);
  });
  test("Сортировка массива из нескольких элементов по убыванию", () => {
    expect(testSelectionSort([1, 9, 3, 5, 6], Direction.Descending)).toEqual([
      9, 6, 5, 3, 1,
    ]);
  });
});
