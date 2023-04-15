describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', { username: 'user', password: 'password' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Blogs app')
    cy.contains('login')
    cy.get('#username').type('user')
    cy.get('#password').type('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('user')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('user logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('usa')
      cy.get('#password').type('passwort')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'Wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })
})