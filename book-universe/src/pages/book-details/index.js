import React, { useState, useEffect, useContext } from 'react'
import PageLayout from '../../components/page-layout'
import Comments from '../../components/comments'
import styles from './index.module.css'
import UserContext from '../../Context'
import BookButtonsPanel from '../../components/book-buttons-panel'
import TextArea from '../../components/textarea'
import getCookie from '../../utils/getCookie'

const BookDetails = (props) => {
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

  const commentHandler = async (event) =>  {
    event.preventDefault();

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

                        <div className={styles['add-comment-wrapper']}>
                          <form onSubmit={commentHandler}>
                            <TextArea
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                              id="title"
                              divClass="form-group"
                              inputClass="form-control"
                              name="title"
                              placeholder="Fill your comment"/>
                              <div className={styles['comment-button']}>
                                <button className="btn btn-info">Comment</button>
                              </div>
                          </form>
                        </div>
                </div>
            </div>
            </PageLayout>)
     
  }
}

  export default BookDetails
