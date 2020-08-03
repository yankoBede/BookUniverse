import React, { useState, useCallback, useEffect } from 'react'
import styles from './index.module.css'
import Comment from '../comment'

const Comments = (props) => {
  const [comments, setComments] = useState([])
  const [deletedComment, setDeletedComment] = useState()

  const getComments = useCallback(async () => {
    const promise = await fetch(`http://localhost:9999/api/comment`)
    const allComments = await promise.json()
    console.log(allComments)
    const specificComments = allComments.filter(c => c.book._id === props.bookId)
    setComments(specificComments)
  }, [props.addedComment, deletedComment])

  const renderComments = () => {
    return comments.map((comment) => {
      return (
        <Comment setDeletedComment={setDeletedComment} key={comment._id} {...comment} />
      )
    })
  }

  useEffect(() => {
    getComments()
  },[getComments])

  return (
    <div className={styles["comments-wrapper"]}>
      <p><strong>Readers comments</strong></p>
      {renderComments()}
    </div>
  )
}

export default Comments
