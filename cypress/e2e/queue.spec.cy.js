import {
  circle,
  DEFAULT_STATE,
  CHANGING_STATE,
  SUBMIT_BTN,
  CIRCLE_HEAD,
  CIRCLE_TAIL,
  DELETE_BTN,
  CLEAR_BTN,
} from "../../src/constants/element-captions";

import { DELAY_IN_MS } from "../../src/constants/delays";

describe("Тест алгоритма Очередь", () => {
  beforeEach(() => {
    cy.visit("/queue");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get("input").as("input");
    cy.get("button").as("button");
    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
  });

  it("Корректное добавление и удаление элементов", () => {
    cy.get(circle).eq(0).as("0");
    cy.get(circle).eq(1).as("1");
    cy.get(circle).eq(2).as("2");

    //Добавление
    for (let i = 0; i < 3; i++) {
      cy.get("input").type(i);
      cy.get(SUBMIT_BTN).click();
      cy.get(`@${i}`).should("have.css", "border", CHANGING_STATE).contains(i);

      cy.wait(DELAY_IN_MS);

      cy.get(`@${i}`).should("have.css", "border", DEFAULT_STATE).contains(i);
    }
    cy.get(CIRCLE_HEAD).eq(0).should("contain", "head");
    cy.get(CIRCLE_TAIL).eq(2).should("contain", "tail");

    //Удаление
    for (let i = 2; i > -1; i--) {
      cy.get(DELETE_BTN).click();
      cy.get(`@${i}`)
        .should("have.css", "border", DEFAULT_STATE)
        .each(($el) => {
          expect($el).contain("");
        });
      cy.wait(DELAY_IN_MS);
    }
    cy.get(circle)
      .should("have.length", 7)
      .each(($el) => {
        expect($el).contain("");
      });
  });

  it("Корректная работа кнопки очистки", () => {
    cy.get(circle).eq(0).as("0");
    cy.get(circle).eq(1).as("1");
    cy.get(circle).eq(2).as("2");

    //Добавление
    for (let i = 0; i < 3; i++) {
      cy.get("input").type(i);
      cy.get(SUBMIT_BTN).click();
      cy.get(`@${i}`).should("have.css", "border", CHANGING_STATE).contains(i);
      cy.wait(DELAY_IN_MS);
      cy.get(`@${i}`).should("have.css", "border", DEFAULT_STATE).contains(i);
    }
    //Очистка
    cy.get(CLEAR_BTN).should("not.be.disabled").click();
    cy.get(circle)
      .should("have.length", 7)
      .each(($el) => {
        expect($el).contain("");
      });
  });
});
