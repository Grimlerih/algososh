import { circle, DEFAULT_STATE } from "../../src/constants/element-captions";

describe("Тест алгоритма Чисел Фибоначи", () => {
  beforeEach(() => {
    cy.visit("/fibonacci");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get("input").as("input");
    cy.get("button").as("button");
    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
  });

  it("Визуализация добавление чисел", () => {
    cy.get("input").type("4");
    cy.get("form").find("button").should("not.be.disabled").click();

    cy.get(circle).eq(0).as("0");
    cy.get(circle).eq(1).as("1");
    cy.get(circle).eq(2).as("2");
    cy.get(circle).eq(3).as("3");
    cy.get(circle).eq(4).as("4");
    cy.get("@0").should("have.css", "border", DEFAULT_STATE).contains("1");
    cy.get("@1").should("have.css", "border", DEFAULT_STATE).contains("1");
    cy.get("@2").should("have.css", "border", DEFAULT_STATE).contains("2");
    cy.get("@3").should("have.css", "border", DEFAULT_STATE).contains("3");
    cy.get("@4").should("have.css", "border", DEFAULT_STATE).contains("5");
  });
});
