describe('Should show mypage', function () {
  it('from direct', function () {
    cy.visit('/mypage');
    cy.get('img.profile__avatar').should(
      'have.attr',
      'src',
      'https://cdn.svgporn.com/logos/gopher.svg'
    );
  });

  it('from top page', function () {
    cy.visit('/');
    cy.get('a.header__link').contains('MYPAGE').click();
    cy.get('img.profile__avatar').should(
      'have.attr',
      'src',
      'https://cdn.svgporn.com/logos/gopher.svg'
    );
  });
});
