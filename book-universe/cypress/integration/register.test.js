import cryptoRandomString from 'crypto-random-string'

describe('Register scenarios', () => {
    const username = cryptoRandomString({length: 10});
    const password = cryptoRandomString({length: 10}) + cryptoRandomString({length: 4, type: 'numeric'}) + '@';

    it('elements verification', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('h1').contains('Register').should('be.visible')
        cy.get('label').contains('Username').should('be.visible')
        cy.get('#username').should('be.visible')
        cy.get('label').contains('Password').should('be.visible')
        cy.get('#password').should('be.visible')
        cy.get('label').contains('Re-Password').should('be.visible')
        cy.get('#rePassword').should('be.visible')
        cy.get('button').contains('Register').should('be.visible')
        cy.get('p').contains('Already Registered?').should('be.visible')
        cy.get('a').contains('Login').should('be.visible')
      })

    it('Registration is successful when all the fields are filled correctly', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('h1').contains('Register')
        cy.get('#username').type(username)
        cy.get('#password').type(password)
        cy.get('#rePassword').type(password)
        cy.get('button').click()
        cy.get('div').contains('You registered successfully!').should('be.visible') 
    })

    it('Register without filling password and rePassword results in error', () => {
      cy.visit('http://localhost:3000/register')
      cy.get('h1').contains('Register')
      cy.get('#username').type(username)
      cy.get('button').click()
      cy.get('div').contains('Please fill all the fields!').should('be.visible')
    })

    it('Register without filling username and rePassword results in error', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('h1').contains('Register')
        cy.get('#password').type(password)
        cy.get('button').click()
        cy.get('div').contains('Please fill all the fields!').should('be.visible') 
    })

    it('Register without filling username and rePassword results in error', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('h1').contains('Register')
        cy.get('#rePassword').type(password)
        cy.get('button').click()
        cy.get('div').contains('Please fill all the fields!').should('be.visible')
    })

    it('Register with username less than 5 symbols results in error', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('h1').contains('Register')
        cy.get('#username').type('fdsf')
        cy.get('#password').type(password)
        cy.get('#rePassword').type(password)
        cy.get('button').click()
        cy.get('div').contains('Username must be between 5 and 20 characters').should('be.visible') 
    })

    it('Register with username more than 20 symbols results in error', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('h1').contains('Register')
        cy.get('#username').type('fdsffdsffdsffdsfdsff1')
        cy.get('#password').type(password)
        cy.get('#rePassword').type(password)
        cy.get('button').click()
        cy.get('div').contains('Username must be between 5 and 20 characters').should('be.visible') 
    })

    it('Register with invalid password results in error', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('h1').contains('Register')
        cy.get('#username').type(username)
        cy.get('#password').type('fdsffdsffdsffdsf1')
        cy.get('#rePassword').type('fdsffdsffdsffdsf1')
        cy.get('button').click()
        cy.get('div').contains('Password must minimum 8 characters and at least 1 alphabet, 1 mumber and 1 special symbols').should('be.visible') 
    })

    it('Register with mismatching password and re-password results in error', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('h1').contains('Register')
        cy.get('#username').type(username)
        cy.get('#password').type(password)
        cy.get('#rePassword').type('fdsffdsffdsffdsf1')
        cy.get('button').click()
        cy.get('div').contains('Password and Re-Password don\'t match').should('be.visible') 
    })

    it('Register with existing username results in error', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('h1').contains('Register')
        cy.get('#username').type('yanko.nikolov')
        cy.get('#password').type(password)
        cy.get('#rePassword').type(password)
        cy.get('button').click()
        cy.get('div').contains('Username is already taken').should('be.visible') 
    })
  
  })