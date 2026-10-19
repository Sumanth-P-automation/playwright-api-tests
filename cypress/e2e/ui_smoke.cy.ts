describe('UI Quality Gate - Smoke Test', () => {
  it('should load the target application successfully', () => {
    cy.visit('https://example.cypress.io');
    cy.contains('type').click();
    cy.url().should('include', '/commands/actions');
    cy.get('.action-email')
      .type('test@example.com')
      .should('have.value', 'test@example.com');
  });
});
