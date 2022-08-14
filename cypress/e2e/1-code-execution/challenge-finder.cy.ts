/// <reference types="cypress" />

describe("Challenge finder", () => {
  it("should try to find challenge 99999", () => {
    // Start from the index page
    cy.visit("/");

    // Find the auto-focussed input element and type in some text
    cy.get("[data-testid=find-challenge-input]").get("input").type("99999");
  }).timeout(10000);

  it("should display an error", () => {
    // the submit button inside the form should be disabled
    cy.get("form").find("button").should("be.disabled");

    // the form should contain the message, "Challenge not found"
    cy.get("form").contains("Challenge not found").should("exist");
  }).timeout(10000);

  it("should try to find challenge 20", () => {
    // now clear input and enter a valid challenge id
    cy.get("[data-testid=find-challenge-input]")
      .get("input")
      .clear()
      .type("20");
  });

  it("should display the challenge title", () => {
    cy.get("form").contains("Hello BASIC").should("exist");
  }).timeout(10000);

  it("should navigate to the challenge on submit", () => {
    // submit the form
    cy.get("form").submit();

    // url should be /c/20
    cy.url().should("include", "/c/20");
  }).timeout(10000);
});

export {};
