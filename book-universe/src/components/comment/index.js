import React, {useContext} from 'react'
import styles from './index.module.css'
import CommentButtonsPanel from '../../components/comment-buttons-panel'


const Comment = ({ content, creator, _id, setDeletedComment, book }) => {
  return (
    <div className={styles.container}>
      <div>
        <small>
            [04.05.2020]
        </small>
        <div>
          <strong>
                <i> {creator.username}: </i>
              </strong>
              <small>
              {content} 
          </small>
        </div>
        <CommentButtonsPanel setDeletedComment={setDeletedComment} book={book} commentId={_id} creatorId={creator._id}/>
      </div>
    </div>
  )
}

export default Comment