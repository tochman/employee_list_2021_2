/* eslint-disable no-undef */
describe("visiting the application, a user ", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://reqres.in/api/users**", {
      fixture: "usersResponse.json",
    });
    cy.visit("/");
  });

  it("is expected to see a header", () => {
    cy.get("[data-cy=employee-header]").should("contain.text", "Employee List");
  });

  it("is expected to see 5 list items", () => {
    cy.get("[data-cy=employee-list]").children().should("have.length", 5);
  });
});
