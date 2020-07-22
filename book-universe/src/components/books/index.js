import React, { Component } from 'react'
import styles from './index.module.css'
import Book from '../book'

class Books extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: []
    }
  }

  getBooks = async () => {
    const { length } = this.props
    const promise = await fetch(`http://localhost:9999/api/book?length=${length}`)
    const books = await promise.json()
    console.log('hello')

    this.setState({
        books
    })
  }

  renderBooks() {
    const { books } = this.state

    return books.map((book, index) => {
      return (
        <Book key={book._id} index={index} {...book} />
      )
    })
  }

  componentDidMount() {
    this.getBooks()
  }

  render() {
    return (
      <div className={styles.movies}>
        {this.renderBooks()}
      </div>
    )
  }
}

export default Books
