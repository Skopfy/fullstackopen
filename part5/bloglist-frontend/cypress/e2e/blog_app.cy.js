describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', { username: 'user', password: 'password' })
    cy.request('POST', 'http://localhost:3003/api/users', { username: 'user2', password: 'password2' })
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'user', password: 'password'
      }).then(response => {
        localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title-input').type('a blog created by cypress')
      cy.get('#author-input').type('Cypress')
      cy.get('#url-input').type('www.cypress.com')
      cy.contains('save').click()
      cy.contains('a blog created by cypress Cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'another note cypress', author: 'Me', url: 'hello.com' })
      })

      it('blog can be liked', function () {
        cy.contains('Show').click()
        cy.get('#like-button').click()
        cy.contains('likes: 1')
      })

      it('blog can be deleted by the user who made it', function () {
        cy.contains('Show').click()
        cy.get('#delete-button').click()
        cy.get('.success').should('contain', 'Successfully deleted a blog.')
        cy.should('not.contain', 'another note cypress')
      })

      it('blog delete-button can only be seen by creator', function () {
        cy.contains('Show').click()
        cy.contains('Delete')
        cy.get('#delete-button')
        cy.get('#logout-button').click()
        cy.request('POST', 'http://localhost:3003/api/login', {
          username: 'user2', password: 'password2'
        }).then(response => {
          localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
        cy.contains('Show').click()
        cy.should('not.contain', 'Delete')
      })
    })
  })
})