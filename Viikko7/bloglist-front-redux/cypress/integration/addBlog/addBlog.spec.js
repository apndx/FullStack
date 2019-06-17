describe('Adding a new blog', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:9002/api/testing/reset')
    const user = {
      name: 'The Tester',
      username: 'tester',
      password: 'tester'
    }
    cy.request('POST', 'http://localhost:9002/api/users/', user)
    cy.visit('http://localhost:3000')
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

  it('Blog page can be found', function() {
    cy.get('#bloglink')
      .click()
  })

  it('A new blog can be added', function() {
    cy.get('#bloglink')
      .click()
    cy.contains('add new blog')
      .click()
    cy.get('#title')
      .type('Adding a blog is such a fun thing')
    cy.get('#author')
      .type('Someone Funny')
    cy.get('#url')
      .type('http://how.fun.can.it.get')
    cy.contains('save')
      .click()
    cy.contains('Adding a blog is such a fun thing -- Someone Funny')
  })

})