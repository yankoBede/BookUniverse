import React, { useState, useEffect, useContext } from 'react'
import PageLayout from '../../components/page-layout'
import Comments from '../../components/comments'
import styles from './index.module.css'
import UserContext from '../../Context'
import BookButtonsPanel from '../../components/book-buttons-panel'
import AddComment from '../../components/add-comment'
import getCookie from '../../utils/getCookie'
import ErrorBoundary from '../../ErrorBoundary'
import { useHistory } from 'react-router-dom'
import publishNotification from '../../utils/publishNotification'
import { useToasts } from 'react-toast-notifications'

const BookDetails = (props) => {
  const [book, setBook] = useState()
  const [isCreator, setIsCreator] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [addedComment, setAddedComment] = useState()
  const context = useContext(UserContext);
  const history = useHistory();
  const { addToast, removeToast } = useToasts()

  const getBook = async () => {
    const promise = await fetch(`http://localhost:9999/api/book`)
    const books = await promise.json()
    const book = books.filter(x => x._id === props.match.params.bookId)[0]
    setIsCreator(context.user.loggedIn && context.user.id === book.creator._id)
    setIsLiked(book.usersLiked.includes(context.user.id))
    setBook(book)
  }

  useEffect(() => {
    getBook()
  },[])

  const onBookEditClick = (event) => {
    event.preventDefault()

    props.history.push(`/books/${book._id}/edit`)
  }

  const onLikeClick = async (event) => {
    book.usersLiked.push(context.user.id);

    await fetch(`http://localhost:9999/api/book/${book._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...book
      }),
      headers: {
          'Content-Type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
      }
    })

    setIsLiked(true)
    publishNotification('You liked this book!', 'success', addToast, removeToast)
  }

  const onDislikeClick = async (event) => {
    book.usersLiked = book.usersLiked.filter(x => x !== context.user.id)

    await fetch(`http://localhost:9999/api/book/${book._id}`, {
      method: 'PUT',
      body: JSON.stringify({
          ...book
      }),
      headers: {
          'Content-Type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
      }
    })

    setIsLiked(false)
    publishNotification('You stopped liking this book!', 'warning', addToast, removeToast)
  }

  const onDeleteClick = async (event) => {
    book.usersLiked.push(context.user.id);

    await fetch(`http://localhost:9999/api/book/${book._id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
      }
    })

    publishNotification('Book has been deleted!', 'warning', addToast, removeToast)
    history.goBack()
  }



    if(!book) {
        return (<PageLayout>
          <img className='img' src='https://media.tenor.com/images/0a000667c5aab43ac265d8c86a4bb310/tenor.gif' alt='Loading' />
          </PageLayout>)
        }
      else {
        return (<PageLayout>
            <div className="row text-center">
                    <div className="col-1"></div>
                    <div className="col-3">
                      <div>
                        <img className={styles["details-img"]} src={book.imageUrl} alt='book-img'/>
                        <BookButtonsPanel 
                          onLikeClick={onLikeClick}
                          onDislikeClick={onDislikeClick}
                          onBookEditClick={onBookEditClick} 
                          onDeleteClick={onDeleteClick}
                          isCreator={isCreator}
                          isLiked={isLiked}/>
                      </div>
                    </div>
                    <div className="col-6">
                      <div>
                          <h2 className="display-5">{book.title}</h2>
                          <h4>{book.author}</h4>
                          <br></br>
                          <p><strong className={styles["book-description"]}>Description:</strong> {book.description}</p>
                      </div>
                      <hr/>
                      <ErrorBoundary>
                        <Comments addedComment={addedComment} bookId={props.match.params.bookId} />
                      </ErrorBoundary>
                      <AddComment bookId={props.match.params.bookId} setAddedComment={setAddedComment}/>
                </div>
            </div>
            </PageLayout>)
  }
}

  export default BookDetails
