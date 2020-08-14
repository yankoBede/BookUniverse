import cryptoRandomString from 'crypto-random-string'

const username = 'yanko.nikolov'
const password = '1234qwer!'

beforeEach(() => {
    cy.visit('http://localhost:3000/login')
    cy.get('h1').contains('Login').should('be.visible')
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('button').click()
    cy.get('div').contains('You logged in successfully!').should('be.visible') 
})
  
describe('Create a book scenarios', () => {
    const title = cryptoRandomString({length: 10})
    const author = cryptoRandomString({length: 10})
    const description = cryptoRandomString({length: 10})
    const imageUrl = 'http://' + cryptoRandomString({length: 10})
  
    it('Create a book successfully', () => {
        cy.get('a').contains('Add a new book').click()
        cy.get('#title').type(title)
        cy.get('#author').type(author)
        cy.get('#description').type(description)
        cy.get('#imageUrl').type(imageUrl)
        cy.get('button').click()
        cy.get('div').contains(`Book with title ${title.trim()} is created successfully!`).should('be.visible') 

        cy.contains(`Hello, ${username}`).click()
        cy.contains(author).next().click()
        cy.contains('Edit').should('be.visible')
        cy.contains('Delete').should('be.visible')
        cy.contains('You could be the first to comment that masterpiece').should('be.visible').should('be.visible')
        cy.contains(`Delete`).click()
        cy.get('div').contains(`Book has been deleted!`).should('be.visible') 
    })

    it('Trying to create a book with empty fields results in error', () => {
        cy.get('a').contains('Add a new book').click()
        cy.get('button').click()
        cy.get('div').contains(`Please fill all the fields`).should('be.visible') 
    })

    it('Trying to create a book with empty title results in error', () => {
        cy.get('a').contains('Add a new book').click()
        cy.get('#author').type(author)
        cy.get('#description').type(description)
        cy.get('#imageUrl').type(imageUrl)
        cy.get('button').click()
        cy.get('div').contains(`Please fill all the fields`).should('be.visible') 
    })

    it('Trying to create a book with empty author results in error', () => {
        cy.get('a').contains('Add a new book').click()
        cy.get('#title').type(title)
        cy.get('#description').type(description)
        cy.get('#imageUrl').type(imageUrl)
        cy.get('button').click()
        cy.get('div').contains(`Please fill all the fields`).should('be.visible') 
    })

    it('Trying to create a book with empty description results in error', () => {
        cy.get('a').contains('Add a new book').click()
        cy.get('#title').type(title)
        cy.get('#author').type(author)
        cy.get('#imageUrl').type(imageUrl)
        cy.get('button').click()
        cy.get('div').contains(`Please fill all the fields`).should('be.visible') 
    })

    it('Trying to create a book with empty image url results in error', () => { 
        cy.get('a').contains('Add a new book').click()
        cy.get('#title').type(title)
        cy.get('#author').type(author)
        cy.get('#description').type(description)
        cy.get('button').click()
        cy.get('div').contains(`Please fill all the fields`).should('be.visible') 
    })

    it('Trying to create a book with invalid image url results in error', () => {
        cy.get('a').contains('Add a new book').click()
        cy.get('#title').type(title)
        cy.get('#author').type(author)
        cy.get('#description').type(description)
        cy.get('#imageUrl').type('invalid')
        cy.get('button').click()
        cy.get('div').contains(`Please add a valid image url`).should('be.visible') 
    })
})