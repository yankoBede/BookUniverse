import React, { Component } from 'react'
import styles from './index.module.css'
import BookInfo from '../book-info'

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

    this.setState({
        books
    })
  }

  renderBooks() {
    const { books } = this.state

    return books.map((book, index) => {
      return (
        <BookInfo key={book._id} index={index} {...book} />
      )
    })
  }

  componentDidMount() {
    this.getBooks()
  }

  render() {
    return (
      <div className={styles.books}>
        {this.renderBooks()}
      </div>
    )
  }
}

export default Books
