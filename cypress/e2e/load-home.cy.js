describe('Horse Racing Game', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the application', () => {
    cy.contains('Horse Racing Game').should('be.visible');
    cy.get('.game-controls').should('exist');
  });
});
