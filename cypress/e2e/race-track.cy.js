describe('Race Track', () => {
  beforeEach(() => {
      cy.visit('/');
      cy.get('.game-controls').should('exist');
  });

  it('starts a race and updates positions', () => {
    cy.get('[data-test="generate-horses"]').click();
    cy.get('[data-test="generate-schedule"]').click();
    cy.get('[data-test="start-race"]').click();
    cy.wait(1000);
    cy.get('[data-test="track"] .horse')
      .first()
      .invoke('attr', 'style')
      .should('include', 'left');
  });
});
