import React, { useState, useCallback, useEffect } from 'react'
import styles from './index.module.css'
import Comment from '../comment'

const Comments = (props) => {
  const [comments, setComments] = useState([])

  const getComments = useCallback(async () => {
    const promise = await fetch(`http://localhost:9999/api/comment`)
    const allComments = await promise.json()
    const specificComments = allComments.filter(c => c.book._id === props.bookId)
    setComments(specificComments)
  }, [props.latestComment])

  const renderComments = () => {
    return comments.map((comment) => {
      return (
        <Comment lastCommnet={props.latestComment} key={comment._id} {...comment} />
      )
    })
  }

  useEffect(() => {
    console.log('hoi')
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
