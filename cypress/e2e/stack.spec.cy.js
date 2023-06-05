import {
  circle,
  DEFAULT_STATE,
  CHANGING_STATE,
  SUBMIT_BTN,
  DELETE_BTN,
  CLEAR_BTN,
} from "../../src/constants/element-captions";

import { DELAY_IN_MS } from "../../src/constants/delays";

describe("Тест алгоритма Стэк", () => {
  beforeEach(() => {
    cy.visit("/stack");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get("input").as("input");
    cy.get("button").as("button");
    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
  });

  it("Корректное добавление и удаление элементов", () => {
    cy.get("input").type("wq");
    cy.get("form").find(SUBMIT_BTN).should("not.be.disabled").click();
    cy.get(circle).eq(0).as("0");
    cy.get("@0")
      .should("have.css", "border", CHANGING_STATE)
      .contains("wq")
      .should("have.length", 1);
    cy.wait(DELAY_IN_MS);
    cy.get("@0")
      .should("have.css", "border", DEFAULT_STATE)
      .contains("wq")
      .should("have.length", 1);
    cy.get("form").find(DELETE_BTN).should("not.be.disabled").click();
    cy.get("@0").should("have.css", "border", CHANGING_STATE);
    cy.wait(DELAY_IN_MS);
    cy.get(circle).should("have.length", 0).should("not.exist");
  });

  it("Корректная работа кнопки очистки", () => {
    const testValue = ["wq", "eq", "ee"];
    cy.clock();
    for (let i = 0; i < testValue.length; i++) {
      cy.get("input").type(testValue[i]);
      cy.get("form").find(SUBMIT_BTN).click();
      cy.tick(DELAY_IN_MS);
    }
    cy.get(CLEAR_BTN).should("not.be.disabled").click();
    cy.get(circle).should("not.exist");
  });
});
