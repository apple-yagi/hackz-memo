describe('Top page', function () {
  before(() => {
    cy.visit('/');
  });

  it('should show header', function () {
    cy.get('a.header__link').contains('HOME');
    cy.get('a.header__link').contains('MYPAGE');
  });
});
