describe('Should not show mypage', function () {
  it('from direct', function () {
    cy.visit('/mypage');
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('from top page', function () {
    cy.visit('/');
    cy.get('a.header__link').contains('MYPAGE').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
