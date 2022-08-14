/// <reference types="cypress" />

describe("Navigation", () => {
  it("should navigate to challenge 20", () => {
    // Start from the index page
    cy.visit("/");

    // Find the auto-focussed input element and type in some text
    cy.get("input").type("20");

    // submit the form
    cy.get("form").submit();

    // url should be /c/20
    cy.url().should("include", "/c/20");

    // delay for the loading to finish
    cy.wait(1000);

    // get the contenteditable element and type a comment
    cy.get("[contenteditable]")
      .type("{enter}{upArrow}{cmd}/")
      .type("Testing comment");

    // submit the form
    cy.get("form").submit();

    // Wait for execution to finish
    cy.wait(3000);

    // assert that an code element on the page contains "Hello World"
    cy.contains("Hello World").should("exist");
  });
});

export {};
