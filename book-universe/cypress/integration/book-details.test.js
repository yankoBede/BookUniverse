import cryptoRandomString from 'crypto-random-string'

const username = 'yanko.nikolov'
const password = '1234qwer!'

beforeEach(() => {
    cy.visit('http://localhost:3000/login')
    cy.get('h1').contains('Login')
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('button').click()
    cy.get('div').contains('You logged in successfully!') 
    cy.visit('http://localhost:3000/books/5f33d6fa87dac5565849229d')
})
  
describe('Books Details scenarios', () => {
    it('Like and dislike a book', () => {
        cy.visit('http://localhost:3000/books/5f33d23187dac5565849229a')
        cy.contains(`Like`).click()
        cy.get('div').contains(`You liked this book!`) 
        cy.get('a').contains('My favourite books').click()
        cy.contains('1984').should('be.visible') 

        cy.visit('http://localhost:3000/books/5f33d23187dac5565849229a')
        cy.contains(`Dislike`).click()
        cy.get('div').contains(`You stopped liking this book!`) 
        cy.get('a').contains('My favourite books').click()
        cy.contains('1984').should('not.exist')
    })
    
    it('All elements are displayed', () => {
        cy.contains(`Edit`).should('be.visible')  
        cy.contains(`Delete`).should('be.visible')  
        cy.contains(`Description:`).should('be.visible')  
        cy.contains(`Readers comments`).should('be.visible')  
        cy.contains(`Comment`).should('be.visible')  
    })

    it('Edit button redirects to the book edit page', () => {
        cy.contains(`Edit`).click()  
        cy.url().should('include', 'books/5f33d6fa87dac5565849229d/edit')
    })

    it('Delete button deletes the book successfully', () => {
        const title = cryptoRandomString({length: 10})
        const author = cryptoRandomString({length: 10})
        const description = cryptoRandomString({length: 10})
        const imageUrl = 'http://' + cryptoRandomString({length: 10})

        cy.get('a').contains('Add a new book').click()
        cy.get('#title').type(title)
        cy.get('#author').type(author)
        cy.get('#description').type(description)
        cy.get('#imageUrl').type(imageUrl)
        cy.get('button').click()
        cy.get('div').contains(`Book with title ${title.trim()} is created successfully!`) 
        cy.visit('http://localhost:3000/myBooks')
        cy.get('a').get('[href="/myBooks"]').click()
        cy.contains(author).next().click()
        cy.contains(`Delete`).click()

        cy.get('div').contains(`Book has been deleted!`) 
    })
})