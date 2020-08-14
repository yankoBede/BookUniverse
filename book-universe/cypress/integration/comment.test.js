const username = 'yanko.nikolov'
const password = '1234qwer!'

beforeEach(() => {
    cy.visit('http://localhost:3000/login')
    cy.get('h1').contains('Login')
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('button').click()
    cy.get('div').contains('You logged in successfully!').should('be.visible') 

    cy.get('a').contains('Add a new book').click()
    cy.get('#title').type('title')
    cy.get('#author').type('author')
    cy.get('#description').type('description')
    cy.get('#imageUrl').type('http://imageUrl')
    cy.get('button').click()
    cy.get('div').contains(`Book with title title is created successfully!`).should('be.visible')
    cy.contains(`Hello, ${username}`).click()
    cy.contains('author').next().click()
})
  
describe('Comments scenarios', () => {
    it('Add a comment and delete it after that', () => {
        cy.get('#comment').type('This is my comment')
        cy.contains('Comment').click()
        cy.get('div').contains('Your comment was added successfully').should('be.visible') 
        cy.contains(`${username}: This is my comment`).should('be.visible')
        cy.get('[data-delete-cy]').click()
        cy.get('div').contains('Comment has been deleted').should('be.visible') 
        cy.contains(`${username}: This is my comment`).should('not.exist')

        cy.contains(`Delete`).click()
        cy.get('div').contains(`Book has been deleted!`) 
    })

    it('Add a comment and edit it after that', () => {
        cy.get('#comment').type('This is my comment')
        cy.contains('Comment').click()
        cy.get('div').contains('Your comment was added successfully').should('be.visible') 
        cy.contains(`${username}: This is my comment`).should('be.visible')
        cy.get('[data-edit-cy]').click()
        cy.get('#content').type(' ')
        cy.get('#content').type('updated')
        cy.get('button').click()
        cy.get('div').contains('Your comment is updated successfully!').should('be.visible') 
        cy.contains(`${username}: This is my comment updated`).should('be.visible')
        cy.get('[data-delete-cy]').click()
        cy.get('div').contains('Comment has been deleted').should('be.visible') 
        cy.contains(`${username}: This is my comment updated`).should('not.exist')

        cy.contains(`Delete`).click()
        cy.get('div').contains(`Book has been deleted!`).should('be.visible') 
    })
})