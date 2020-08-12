import cryptoRandomString from 'crypto-random-string'

const username = 'yanko.nikolov'
const password = '1234qwer!'
const newTitle = cryptoRandomString({length: 10})
const newAuthor = cryptoRandomString({length: 10})
const newDescription = cryptoRandomString({length: 10})
const newImageUrl = 'http://' + cryptoRandomString({length: 10})

beforeEach(() => {
    cy.visit('http://localhost:3000/login')
    cy.get('h1').contains('Login')
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('button').click()
    cy.get('div').contains('You logged in successfully!') 

    cy.get('a').contains('Add a new book').click()
    cy.get('#title').type('title')
    cy.get('#author').type('author')
    cy.get('#description').type('description')
    cy.get('#imageUrl').type('http://imageUrl')
    cy.get('button').click()
    cy.get('div').contains(`Book with title title is created successfully!`)
    cy.contains(`Hello, ${username}`).click()
    cy.contains('author').next().click()
    cy.contains('Edit').click()
})
  
describe('Edit a book scenarios', () => {
    it('Edit a book successfully', () => {
        cy.wait(1000)
        cy.get('#title').clear().type(newTitle)
        cy.get('#author').clear().type(newAuthor)
        cy.get('#description').clear().type(newDescription)
        cy.get('#imageUrl').clear().type(newImageUrl)
        cy.get('button').click()
        cy.get('div').contains(`Book has been updated!`)

        cy.contains(`Hello, ${username}`).click()
        cy.contains(newAuthor).next().click()
        cy.contains(`Delete`).click()
        cy.get('div').contains(`Book has been deleted!`) 
    })

    it('Trying to edit a book with empty fields results in error', () => {
        cy.wait(1000)
        cy.get('#title').clear()
        cy.get('#author').clear()
        cy.get('#description').clear()
        cy.get('#imageUrl').clear()
        cy.get('button').click()
        cy.get('div').contains(`Please fill all the fields`) 

        cy.contains(`Hello, ${username}`).click()
        cy.contains('author').next().click()
        cy.contains(`Delete`).click()
        cy.get('div').contains(`Book has been deleted!`) 
    })

    it('Trying to edit a book with empty title results in error', () => {
        cy.wait(1000)
        cy.get('#title').clear()
        cy.get('button').click()
        cy.get('div').contains(`Please fill all the fields`) 

        cy.contains(`Hello, ${username}`).click()
        cy.contains('author').next().click()
        cy.contains(`Delete`).click()
        cy.get('div').contains(`Book has been deleted!`) 
    })

    it('Trying to edit a book with empty author results in error', () => {
        cy.wait(1000)
        cy.get('#author').clear()
        cy.get('button').click()
        cy.get('div').contains(`Please fill all the fields`) 

        cy.contains(`Hello, ${username}`).click()
        cy.contains('author').next().click()
        cy.contains(`Delete`).click()
        cy.get('div').contains(`Book has been deleted!`) 
    })

    it('Trying to edit a book with empty description results in error', () => {
        cy.wait(1000)
        cy.get('#description').clear()
        cy.get('button').click()
        cy.get('div').contains(`Please fill all the fields`) 

        cy.contains(`Hello, ${username}`).click()
        cy.contains('author').next().click()
        cy.contains(`Delete`).click()
        cy.get('div').contains(`Book has been deleted!`) 
    })

    it('Trying to edit a book with empty image url results in error', () => { 
        cy.wait(1000)
        cy.get('#imageUrl').clear()
        cy.get('button').click()
        cy.get('div').contains(`Please fill all the fields`) 

        cy.contains(`Hello, ${username}`).click()
        cy.contains('author').next().click()
        cy.contains(`Delete`).click()
        cy.get('div').contains(`Book has been deleted!`) 
    })

    it('Trying to edit a book with invalid image url results in error', () => {
        cy.wait(1000)
        cy.get('#imageUrl').clear()
        cy.get('#imageUrl').type('invalid')
        cy.get('button').click()
        cy.get('div').contains(`Please add a valid image url`) 

        cy.contains(`Hello, ${username}`).click()
        cy.contains('author').next().click()
        cy.contains(`Delete`).click()
        cy.get('div').contains(`Book has been deleted!`) 
    })
})