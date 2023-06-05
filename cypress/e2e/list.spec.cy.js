import {
  circle,
  DEFAULT_STATE,
  CHANGING_STATE,
  SUBMIT_BTN,
  DELETE_BTN,
  CIRCLE_HEAD,
  CIRCLE_TAIL,
  circleSmall,
  CHANGING_STATE_SMALL,
  MODIFIED_STATE,
} from "../../src/constants/element-captions";

import { DELAY_IN_MS } from "../../src/constants/delays";

describe("Тест алгоритма Стэк", () => {
  beforeEach(() => {
    cy.visit("/list");
  });

  it("Если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get("input").should("have.value", "");
    cy.get(SUBMIT_BTN).should("be.disabled");
    cy.get(DELETE_BTN).eq(2).should("be.disabled");
  });

  it("Отрисовка дефотлтного списка", () => {
    cy.get(circle).each((item) => {
      expect(item).to.have.css("border", DEFAULT_STATE);
    });
    cy.get(CIRCLE_HEAD).eq(0).should("contain", "head");
    cy.get(CIRCLE_TAIL).eq(-1).should("contain", "tail");
  });

  it("Добавление элемента в head ", () => {
    cy.get("input").eq(0).type("1");
    cy.get(SUBMIT_BTN).eq(0).click();

    cy.get(circleSmall).should((item) => {
      expect(item).to.contain("1").to.have.css("border", DEFAULT_STATE);
    });
    cy.get(circle).should("have.css", "border", DEFAULT_STATE).contains("1");
  });

  it("Добавление элемента в tail ", () => {
    cy.get("input").eq(0).type("1");
    cy.get(SUBMIT_BTN).eq(1).click();

    cy.get(circleSmall).should((item) => {
      expect(item)
        .to.contain("1")
        .to.have.css("border-color", CHANGING_STATE_SMALL);
    });
    cy.get(circle)
      .eq(-1)
      .should("have.css", "border", MODIFIED_STATE)
      .contains("1");
    cy.wait(DELAY_IN_MS);
    cy.get(circle)
      .eq(-1)
      .should("have.css", "border", DEFAULT_STATE)
      .contains("1");
  });

  it("Добавление элемента по индексу ", () => {
    cy.get("input").eq(0).type("22");
    cy.get("input").eq(1).type("1");
    cy.get(SUBMIT_BTN).eq(2).click();
    cy.get(circle)
      .eq(0)
      .should("have.css", "border", DEFAULT_STATE)
      .contains("22");
    cy.get(circle)
      .eq(1)
      .should("have.css", "border", CHANGING_STATE)
      .contains("0");
    cy.wait(500);
    cy.get(circle)
      .eq(1)
      .should("have.css", "border", MODIFIED_STATE)
      .contains("22");
  });

  it("Удаление элемента из head ", () => {
    cy.get(DELETE_BTN).eq(0).should("not.be.disabled").click();
    cy.get(circle)
      .eq(0)
      .should("have.css", "border", DEFAULT_STATE)
      .each(($el) => {
        expect($el).contain("");
      });
    cy.get(circleSmall)
      .should("have.css", "border", CHANGING_STATE)
      .each(($el) => {
        expect($el).contain("0");
      });
    cy.wait(500);
    cy.get(circle)
      .eq(0)
      .should("have.css", "border", DEFAULT_STATE)
      .contains("34");
  });

  it("Удаление элемента из tail ", () => {
    cy.get(DELETE_BTN).eq(1).should("not.be.disabled").click();
    cy.get(circle)
      .eq(3)
      .should("have.css", "border", DEFAULT_STATE)
      .each(($el) => {
        expect($el).contain("");
      });
    cy.get(circleSmall)
      .should("have.css", "border", CHANGING_STATE)
      .each(($el) => {
        expect($el).contain("1");
      });
    cy.wait(500);
    cy.get(circle)
      .eq(2)
      .should("have.css", "border", DEFAULT_STATE)
      .contains("8");
  });

  it("Удаление элемента по индексу ", () => {
    cy.get("input").eq(1).type("1");
    cy.get(DELETE_BTN).eq(2).should("not.be.disabled").click();
    cy.get(circle).eq(0).should("have.css", "border", CHANGING_STATE);
    cy.get(circle)
      .eq(1)
      .should("have.css", "border", CHANGING_STATE)
      .contains("34");
    cy.get(circleSmall)
      .should("have.css", "border", CHANGING_STATE)
      .contains("34");
    cy.wait(500);
    cy.get(circle)
      .eq(1)
      .should("have.css", "border", DEFAULT_STATE)
      .contains("8");
  });
});
