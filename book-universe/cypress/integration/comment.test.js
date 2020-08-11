import cryptoRandomString from 'crypto-random-string'

const username = 'yanko89'
const password = '1234qwer!'

beforeEach(() => {
    cy.visit('http://localhost:3000/login')
    cy.get('h1').contains('Login')
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('button').click()
    cy.get('div').contains('You logged in successfully!') 
    cy.visit('http://localhost:3000/books/5f32934f7202ca3170a4b3a5')
})
  
describe('Comments scenarios', () => {
    it('Add a comment and delete it after that', () => {
        cy.get('#comment').type('This is my comment')
        cy.contains('Comment').click()
        cy.get('div').contains('Your comment was added successfully') 
        cy.contains(`${username}: This is my comment`).should('be.visible')
        cy.get('[data-delete-cy]').click()
        cy.get('div').contains('Comment has been deleted') 
        cy.contains(`${username}: This is my comment`).should('not.exist')
    })

    it('Add a comment and edit it after that', () => {
        cy.get('#comment').type('This is my comment')
        cy.contains('Comment').click()
        cy.get('div').contains('Your comment was added successfully') 
        cy.contains(`${username}: This is my comment`).should('be.visible')
        cy.get('[data-edit-cy]').click()
        cy.get('#content').type(' updated')
        cy.get('button').click()
        cy.get('div').contains('Your comment is updated successfully!') 
        cy.contains(`${username}: This is my comment updated`).should('be.visible')
        cy.get('[data-delete-cy]').click()
        cy.get('div').contains('Comment has been deleted') 
        cy.contains(`${username}: This is my comment updated`).should('not.exist')
    })
})