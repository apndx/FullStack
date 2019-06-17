describe('Blog login', function() {

  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('login form can be opened', function() {
    cy.contains('log in')
      .click()
  })

it('user can login', function() {
  cy.contains('log in')
    .click()
  cy.get('input:first')
    .type('tester')
  cy.get('input:last')
    .type('tester')
  cy.contains('login')
    .click()
  cy.contains('The Tester logged in')
})


})
