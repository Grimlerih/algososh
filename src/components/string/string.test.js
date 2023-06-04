import { testReverseString } from "./utils";

describe("Тестирование алгоритма разворота строки", () => {
  it("Разворот пустой строки", () => {
    expect(testReverseString("")).toEqual([]);
  });
  it("Разворот строки с одним символом", () => {
    expect(testReverseString("q")).toEqual(["q"]);
  });
  it("Разворот строки с четным колличеством символом", () => {
    expect(testReverseString("test")).toEqual(["t", "s", "e", "t"]);
  });
  it("Разворот строки с нечетным колличеством символом", () => {
    expect(testReverseString("tes")).toEqual(["s", "e", "t"]);
  });
});
