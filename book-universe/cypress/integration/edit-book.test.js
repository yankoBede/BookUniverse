import cryptoRandomString from 'crypto-random-string'

const username = 'yanko89'
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
    cy.visit('http://localhost:3000/books/5f32b88db77eab3ca8ee6f39')
    cy.visit('http://localhost:3000/books/5f32b88db77eab3ca8ee6f39/edit')
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
    })

    it('Trying to edit a book with empty fields results in error', () => {
        cy.wait(1000)
        cy.get('#title').clear()
        cy.get('#author').clear()
        cy.get('#description').clear()
        cy.get('#imageUrl').clear()
        cy.get('button').click()
        cy.get('div').contains(`Please fill all the fields`) 
    })

    it('Trying to edit a book with empty title results in error', () => {
        cy.wait(1000)
        cy.get('#title').clear()
        cy.get('button').click()
        cy.get('div').contains(`Please fill all the fields`) 
    })

    it('Trying to edit a book with empty author results in error', () => {
        cy.wait(1000)
        cy.get('#author').clear()
        cy.get('button').click()
        cy.get('div').contains(`Please fill all the fields`) 
    })

    it('Trying to edit a book with empty description results in error', () => {
        cy.wait(1000)
        cy.get('#description').clear()
        cy.get('button').click()
        cy.get('div').contains(`Please fill all the fields`) 
    })

    it('Trying to edit a book with empty image url results in error', () => { 
        cy.wait(1000)
        cy.get('#imageUrl').clear()
        cy.get('button').click()
        cy.get('div').contains(`Please fill all the fields`) 
    })

    it('Trying to edit a book with invalid image url results in error', () => {
        cy.wait(1000)
        cy.get('#imageUrl').clear()
        cy.get('#imageUrl').type('invalid')
        cy.get('button').click()
        cy.get('div').contains(`Please add a valid image url`) 
    })
})