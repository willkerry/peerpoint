/// <reference types="cypress" />

describe("Navigation", () => {
  it("should try to find challenge 99999", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find the auto-focussed input element and type in some text
    cy.get("input").type("99999");

    // wait for the request
    cy.wait(3000);

    // the submit button inside the form should be disabled
    cy.get("form").find("button").should("be.disabled");

    // the form should contain the message, "Challenge not found"
    cy.get("form").contains("Challenge not found").should("exist");

    // now clear input and enter a valid challenge id
    cy.get("input").clear().type("20");

    // wait for the request
    cy.wait(3000);

    // submit the form
    cy.get("form").submit();

    // url should be /c/20
    cy.url().should("include", "/c/20");
  });
});

export {};
