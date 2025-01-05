describe('Generate Horses', () => {
  beforeEach(() => {
      cy.visit('/');
      cy.get('.game-controls').should('exist');
  });

  it('generates horses correctly', () => {
    cy.get('[data-test="generate-horses"]').click();
    cy.get('[data-test="horses"]').children().should('have.length', 20);
  });
});
