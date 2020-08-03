import React, { useState, useEffect, useContext } from 'react'
import PageLayout from '../../components/page-layout'
import Comments from '../../components/comments'
import styles from './index.module.css'
import UserContext from '../../Context'
import BookButtonsPanel from '../../components/book-buttons-panel'
import getCookie from '../../utils/getCookie'
import AddComment from '../../components/add-comment'
import { useToasts } from 'react-toast-notifications'

const BookDetails = (props) => {
  const { addToast, removeToast } = useToasts()
  const [book, setBook] = useState()
  const [isCreator, setIsCreator] = useState(false)
  const [content, setContent] = useState()
  const [addedComment, setAddedComment] = useState()
  const context = useContext(UserContext);

  const getBook = async () => {
    const promise = await fetch(`http://localhost:9999/api/book`)
    const books = await promise.json()
    const book = books.filter(x => x._id === props.match.params.bookId)[0]
    setIsCreator(context.user.loggedIn && context.user.id === book.creator._id)

    setBook(book) 
  }
  
  useEffect( () => {
    getBook()
  },[])

  const onCommentClick = (event) => {
    event.preventDefault()
    
    props.history.push(`/books/${book._id}/comment`)
  }

  const sumbitCommentHandler = async (event) =>  {
    event.preventDefault();

    if(!content) {
      publishNotification('Please fill your comment', 'error')
      return
    } 

    const createdAt = Date()

    const promise = await fetch('http://localhost:9999/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        content,
        createdAt,
        book: props.match.params.bookId
      }),
      headers: {
          'Content-Type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
      }
    })

    setAddedComment(content)
    setContent('')
    publishNotification('Your comment was added successfully', 'success')
 } 

 const publishNotification = (message, notificationType) => {
  const toast = addToast(message, { appearance: notificationType })

  setInterval(function() {
    removeToast(toast)
  }, 3000);
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
                        <BookButtonsPanel isCreator={isCreator} onCommentClick={onCommentClick}/>
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
                      <AddComment content={content} sumbitCommentHandler={sumbitCommentHandler} onChangeHandler={(e) => setContent(e.target.value)} />
                </div>
            </div>
            </PageLayout>)
     
  }
}

  export default BookDetails
