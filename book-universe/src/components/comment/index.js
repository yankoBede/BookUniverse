import React from 'react'
import styles from './index.module.css'
import CommentButtonsPanel from '../../components/comment-buttons-panel'
import getFormattedDate from '../../utils/getFormattedDate'

const Comment = ({ content, creator, _id, setDeletedComment, book, createdAt }) => {
  
  return (
    <div className={styles.container}>
      <div>
        <small>
          { getFormattedDate(new Date(createdAt)) }
        </small>
        <div>
          <strong>
                <i> {creator.username}: </i>
              </strong>
              <small>
              {content} 
          </small>
        </div>
        <CommentButtonsPanel commentContent={content} setDeletedComment={setDeletedComment} book={book} commentId={_id} creatorId={creator._id}/>
      </div>
    </div>
  )
}

export default Comment