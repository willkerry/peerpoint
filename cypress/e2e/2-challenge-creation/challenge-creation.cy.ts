/// <reference types="cypress" />

before(() => {
  cy.intercept("/api/auth/session", {
    statusCode: 200,
    body: {
      user: { name: null, email: "testuser@wk.fyi", image: null },
      expires: new Date(Date.now() + 3600 * 1000),
    },
  });
  cy.visit("/create");
});

describe("Title field", () => {
  it("should exist", () => {
    cy.findByRole("textbox", { name: "Title" }).should("exist");
  }).timeout(10000);

  it("should be empty", () => {
    cy.findByRole("textbox", { name: "Title" }).should("have.value", "");
  }).timeout(10000);

  it("should be editable", () => {
    cy.findByRole("textbox", { name: "Title" }).type("Hello World");
    cy.findByRole("textbox", { name: "Title" }).should(
      "have.value",
      "Hello World"
    );
  }).timeout(10000);
}).timeout(10000);

describe("Language selector field", () => {
  it("should exist", () => {
    cy.findByRole("searchbox", { name: "Language" }).should("exist");
  }).timeout(10000);

  it("should be empty", () => {
    cy.findByRole("searchbox", { name: "Language" }).should("have.value", "");
  }).timeout(10000);

  it("should be editable", () => {
    cy.findByRole("searchbox", { name: "Language" }).type("javascript");
    cy.findByRole("searchbox", { name: "Language" })
      .should("have.value", "javascript")
      .type("{downarrow}{enter}");
  }).timeout(10000);
}).timeout(10000);

describe("Code skeleton field", () => {
  it("should exist", () => {
    cy.findAllByTestId("code-editor").should("exist");
  }).timeout(10000);

  it("should be editable", () => {
    cy.findAllByTestId("code-editor").first().type("console.log('Test')");
  }).timeout(10000);
}).timeout(10000);

describe("Run/populate button", () => {
  it("should exist", () => {
    cy.findByTestId("run-populate-button").should("exist");
  }).timeout(10000);

  it("should be disabled when skeleton blank", () => {
    cy.findAllByTestId("code-editor").first().clear();
    cy.findByTestId("run-populate-button").should("be.disabled");
  }).timeout(10000);

  it("should be enabled when skeleton has value", () => {
    cy.findAllByTestId("code-editor").first().type("console.log('Test2')");
    cy.findByTestId("run-populate-button").should("be.enabled");
  }).timeout(10000);

  it("should run the challenge", () => {
    cy.findByTestId("run-populate-button").click();
    cy.findAllByTestId("code-editor").last().should("contain", "Test2");
  }).timeout(10000);
}).timeout(10000);

describe("Cancel button", () => {
  it("should exist", () => {
    cy.findByRole("button", { name: "Cancel" }).click();
    cy.findByRole("button", { name: "Return" }).click();
  }).timeout(10000);

  it("should return to previous page", () => {
    cy.findByRole("button", { name: "Cancel" }).click();
    cy.findByRole("button", { name: "Yes" }).click();
  }).timeout(10000);
}).timeout(10000);

export {};
