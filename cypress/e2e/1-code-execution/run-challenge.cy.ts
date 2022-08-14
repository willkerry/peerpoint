/// <reference types="cypress" />

const testChallenge = {
  id: 20,
  title: "Hello BASIC",
};

const checkURL = () => cy.url().should("include", `/c/${testChallenge.id}`);

const checkTitle = () =>
  cy.get("[data-testid=page-title]").contains(testChallenge.title);

describe("Navigate to a challenge", () => {
  it("should navigate to challenge 20", () => {
    cy.visit(`/c/${testChallenge.id}`);

    // check the URL and the title
    checkURL();
    checkTitle();
  });
}).timeout(10000);

describe("Code editor", () => {
  it("should exist", () => {
    // get the code editor element
    cy.get("[data-testid=code-editor]")
      .get("[contenteditable]")
      .should("exist");
  }).timeout(10000);

  it("should be editable", () => {
    // type some text into the code editor
    cy.get("[data-testid=code-editor]")
      .get("[contenteditable]")
      .type("{enter}{upArrow}1234")
      .get(".cm-activeLine")
      // check the text is there
      .should("contain", "1234")
      // delete the text
      .type("{backspace}{backspace}{backspace}{backspace}");
  }).timeout(10000);
}).timeout(10000);

describe("Run challenge", () => {
  it("should run the challenge", () => {
    // click the run button
    cy.get("[data-testid=run-challenge-button]").click();
    // check the output is displayed
    cy.get("[data-testid=output]").should("contain", "Hello World");
  }).timeout(10000);

  it("should dismiss modal", () => {
    // click the modal overlay
    cy.get(".mantine-Modal-overlay").click().should("not.exist");
  }).timeout(10000);

  it("should report errors", () => {
    cy.get("[data-testid=code-editor]")
      .get("[contenteditable]")
      // type some text that will cause an error
      .type("{enter}not a valid statement");
    // click the run button
    cy.get("[data-testid=run-challenge-button]").click();
    // check the output contains some error text
    cy.get("[data-testid=output]").should("contain", "error");
  }).timeout(10000);
}).timeout(10000);

export {};
