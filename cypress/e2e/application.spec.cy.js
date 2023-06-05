describe("Проверка на запуск приложения", function () {
  it("должен быть доступен на localhost:3000", function () {
    cy.visit("/");
    cy.wait(1000);
  });
});
