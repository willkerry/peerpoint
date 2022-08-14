/// <reference types="cypress" />

describe("Navigation", () => {
  it("should navigate to challenge 20", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/c/20");

    // click the element that contains "ID 00020"
    cy.contains("ID 00020").click();

    // should lauch a modal
    cy.get(".mantine-Overlay-root").should("exist");

    // .mantine-Modal-root  modal should contain an image with the correct src
    cy.get(".mantine-Modal-root")
      .find("img")
      .should(
        "have.attr",
        "src",
        "https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=https%3A%2F%2Fpeerpoint.wk.fyi%2Fc%2F20&choe=UTF-8&chld=H%7C0"
      );

    // modal should close when the close button is clicked
    cy.get(".mantine-Modal-root").find(".mantine-Modal-close").click();
  }).timeout(10000);
});

export {};
