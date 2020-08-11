describe('Login scenarios', () => {
  const username = 'yanko89'
  const password = '1234qwer!'

  it('elements verification', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('h1').contains('Login').should('be.visible')
    cy.get('label').contains('Username').should('be.visible')
    cy.get('#username').should('be.visible')
    cy.get('label').contains('Password').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('button').contains('Login').should('be.visible')
    cy.get('p').contains('Don\'t have account yet?').should('be.visible')
    cy.get('a').contains('Register').should('be.visible')
  })

  it('Log in successfully', () => {
    cy.visit('http://localhost:3000')
    cy.get('a').contains('Login').click()
    cy.get('h1').contains('Login')
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('button').click()
    cy.get('div').contains('You logged in successfully!') 
  })

  it('Log in with invalid username results in error', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('h1').contains('Login')
    cy.get('#username').type('invalid')
    cy.get('#password').type(password)
    cy.get('button').click()
    cy.get('div').contains('Login is unsuccessful! Please double-check your credentials') 
  })

  it('Log in with invalid password results in error', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('h1').contains('Login')
    cy.get('#username').type(username)
    cy.get('#password').type('invalid')
    cy.get('button').click()
    cy.get('div').contains('Login is unsuccessful! Please double-check your credentials') 
  })
})