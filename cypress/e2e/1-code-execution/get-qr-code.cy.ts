/// <reference types="cypress" />

describe("Navigation", () => {
  it("should have an ID share button", () => {
    cy.visit(`/c/20`);
    cy.get("[data-testid=id-button]").should("contain", "ID 00020");
  }).timeout(10000);

  it("should launch a QR code", () => {
    cy.get("[data-testid=id-button]").click();
    cy.get("[data-testid=qr-code]")
      .find("img")
      .should(
        "have.attr",
        "src",
        "https://chart.googleapis.com/chart?cht=qr&chs=480x480&chl=https%3A%2F%2Fpeerpoint.wk.fyi%2Fc%2F20&choe=UTF-8&chld=H%7C0"
      );
  }).timeout(10000);

  it("should have a download button", () => {
    cy.get("[data-testid=qr-download-button]").should("contain", "Download");
  }).timeout(10000);
});

export {};
