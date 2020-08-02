import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import Comment from '../comment'

const Comments = (props) => {
  const [comments, setComments] = useState([])

  const getComments = async () => {
    const promise = await fetch(`http://localhost:9999/api/comment`)
    const allComments = await promise.json()
    const specificComments = allComments.filter(c => c.book._id === props.bookId)
    setComments(specificComments)
  }

  const renderComments = () => {
    return comments.map((comment) => {
      return (
        <Comment key={comment._id} {...comment} />
      )
    })
  }

  useEffect(() => {
    getComments()
  },[])

  return (
    <div className={styles["comments-wrapper"]}>
      <p><strong>Readers comments</strong></p>
      {renderComments()}
    </div>
  )
}

export default Comments
