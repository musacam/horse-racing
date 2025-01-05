describe("Race Track", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".game-controls").should("exist");
  });

  it("completes a race and records results", () => {
    cy.get('[data-test="generate-horses"]').click();
    cy.get('[data-test="generate-schedule"]').click();
    cy.get('[data-test="start-race"]').click();
    cy.wait(5000);
    cy.get('[data-test="results-container"]').should("contain", "Round 1");
  });
});
