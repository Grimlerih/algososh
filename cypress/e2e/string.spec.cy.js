import {
  circle,
  DEFAULT_STATE,
  CHANGING_STATE,
  MODIFIED_STATE,
} from "../../src/constants/element-captions";

import { DELAY_IN_MS } from "../../src/constants/delays";

describe("Тест алгоритма Строка", () => {
  beforeEach(() => {
    cy.visit("/recursion");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get("input").as("input");
    cy.get("button").as("button");
    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
  });

  it("Проверка на корректность разворота строки", () => {
    cy.get("input").type("numb");
    cy.get("form").find("button").should("not.be.disabled").click();
    cy.get(circle).eq(0).as("0");
    cy.get(circle).eq(1).as("1");
    cy.get(circle).eq(2).as("2");
    cy.get(circle).eq(3).as("3");
    cy.get("@0").should("have.css", "border", CHANGING_STATE).contains("n");
    cy.get("@1").should("have.css", "border", DEFAULT_STATE).contains("u");
    cy.get("@2").should("have.css", "border", DEFAULT_STATE).contains("m");
    cy.get("@3").should("have.css", "border", CHANGING_STATE).contains("b");
    cy.wait(DELAY_IN_MS);
    cy.get("@0").should("have.css", "border", MODIFIED_STATE).contains("b");
    cy.get("@1").should("have.css", "border", CHANGING_STATE).contains("u");
    cy.get("@2").should("have.css", "border", CHANGING_STATE).contains("m");
    cy.get("@3").should("have.css", "border", MODIFIED_STATE).contains("n");
    cy.wait(DELAY_IN_MS);
    cy.get("@0").should("have.css", "border", MODIFIED_STATE).contains("b");
    cy.get("@1").should("have.css", "border", MODIFIED_STATE).contains("m");
    cy.get("@2").should("have.css", "border", MODIFIED_STATE).contains("u");
    cy.get("@3").should("have.css", "border", MODIFIED_STATE).contains("n");
  });
});
