import React, { useState, useEffect, useContext } from 'react'
import styles from './index.module.css'
import BookInfo from '../book-info'
import UserContext from '../../Context'

const Books = (props) => {
  const context = useContext(UserContext);
  const [books, setBooks] = useState()

  const getBooks = async () => {
    const promise = await fetch(`http://localhost:9999/api/book`)
    const allBooks = await promise.json()

    if (props.onlyLiked) {
      const favouriteBooks = allBooks.filter(x => x.usersLiked.includes(context.user.id))
      setBooks(favouriteBooks)
    } else if (props.addedByMe) {
      const addedByMeBooks = allBooks.filter(x => x.creator._id === context.user.id).sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))

      setBooks(addedByMeBooks)
    } if (props.topBooks) {
      const mostLikedBooks = allBooks.sort((a, b) => b.usersLiked - a.usersLiked).slice(0, 5)
      setBooks(mostLikedBooks)
    } if (props.allBooks) {
      setBooks(allBooks)
    }  
  }

  const renderBooks = () => {
    console.log(books)
    if (books) {
      return books.map((book, index) => {
        return (
          <BookInfo key={book._id} index={index} {...book} />
        )
      })
    }
  }

  useEffect(() => {
    getBooks()
  }, [])

  return (
    <div className={styles.books}>
      {renderBooks()}
    </div>
  )
}

export default Books
