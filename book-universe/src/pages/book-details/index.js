import React, { useState, useEffect, useContext } from 'react'
import PageLayout from '../../components/page-layout'
import Comments from '../../components/comments'
import styles from './index.module.css'
import UserContext from '../../Context'
import BookButtonsPanel from '../../components/book-buttons-panel'
import AddComment from '../../components/add-comment'
import getCookie from '../../utils/getCookie'

const BookDetails = (props) => {
  const [book, setBook] = useState()
  const [isCreator, setIsCreator] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [addedComment, setAddedComment] = useState()
  const context = useContext(UserContext);

  const getBook = async () => {
    const promise = await fetch(`http://localhost:9999/api/book`)
    const books = await promise.json()
    const book = books.filter(x => x._id === props.match.params.bookId)[0]
    setIsCreator(context.user.loggedIn && context.user.id === book.creator._id)
    setIsLiked(book.usersLiked.includes(context.user.id))
    setBook(book)

    console.log(book.usersLiked)
    console.log(context.user.id)
  }

  useEffect( () => {
    getBook()
  },[])

  const onBookEditClick = (event) => {
    event.preventDefault()

    props.history.push(`/books/${book._id}/edit`)
  }

  const onLikeClick = async (event) => {
    book.usersLiked.push(context.user.id);
    console.log(book._id)
    console.log(book.usersLiked)

    const promise = await fetch(`http://localhost:9999/api/book/${book._id}`, {
      method: 'PUT',
      body: JSON.stringify({
          author: book.author,
          title: book.title,
          description: book.description,
          imageUrl: book.imageUrl,
          createdAt: book.createdAt,
          usersLiked: book.usersLiked
      }),
      headers: {
          'Content-Type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
      }
    })
    const response = await promise.json();

    setIsLiked(true)
  }

  const onDislikeClick = async (event) => {
    book.usersLiked = book.usersLiked.filter(x => x != context.user.id)

    const promise = await fetch(`http://localhost:9999/api/book/${book._id}`, {
      method: 'PUT',
      body: JSON.stringify({
          author: book.author,
          title: book.title,
          description: book.description,
          imageUrl: book.imageUrl,
          createdAt: book.createdAt,
          usersLiked: book.usersLiked
      }),
      headers: {
          'Content-Type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
      }
    })
    const response = await promise.json();

    setIsLiked(false)
  }

    if(!book) {
        return (<PageLayout>
          <p><strong className="infoType"> LOADING...</strong> </p>
          </PageLayout>)
        }
      else {
        return (<PageLayout>
            <div className="row text-center">
                    <div className="col-1"></div>
                    <div className="col-3">
                      <div>
                        <img className={styles["details-img"]} src={book.imageUrl}/>
                        <BookButtonsPanel 
                          onLikeClick={onLikeClick}
                          onDislikeClick={onDislikeClick}
                          onBookEditClick={onBookEditClick} 
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
                      <Comments addedComment={addedComment} bookId={props.match.params.bookId} />
                      <AddComment bookId={props.match.params.bookId} setAddedComment={setAddedComment}/>
                </div>
            </div>
            </PageLayout>)
  }
}

  export default BookDetails
