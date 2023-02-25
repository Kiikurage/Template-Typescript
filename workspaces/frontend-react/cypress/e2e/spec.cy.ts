describe('template spec', () => {
    it('Home page should be displayed in "/"', () => {
        cy.visit('/');
        cy.contains('h2', 'Home').should('exist');
    });

    it('Link to page2 should work', () => {
        cy.visit('/');
        cy.contains('a', 'Page2').click();
        cy.contains('h2', 'Page2').should('exist');
    });

    it('Link to home should work', () => {
        cy.visit('/#/page2');
        cy.contains('a', 'Home').click();
        cy.contains('h2', 'Home').should('exist');
    });
});
