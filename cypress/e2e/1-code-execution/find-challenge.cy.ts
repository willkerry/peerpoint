/// <reference types="cypress" />

describe("Navigation", () => {
  it("should navigate to challenge 20", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find the auto-focussed input element and type in some text
    cy.get("input").type("20");

    // submit the form
    cy.get("form").submit();

    // url should be /c/20
    cy.url().should("include", "/c/20");

    // title should be "Hello BASIC"
    cy.title().should("include", "Hello BASIC");
  });
});

export {};
