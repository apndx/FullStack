describe('Blog login', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:9002/api/testing/reset')
    const user = {
      name: 'The Tester',
      username: 'tester',
      password: 'tester'
    }
    cy.request('POST', 'http://localhost:9002/api/users/', user)
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
    cy.get('#username')
      .type('tester')
    cy.get('#password')
      .type('tester')
    cy.contains('login')
      .click()
    cy.contains('The Tester logged in')
  })

})
