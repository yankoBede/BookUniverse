import React, {useContext} from 'react'
import styles from './index.module.css'
import CommentButtonsPanel from '../../components/comment-buttons-panel'


const Comment = ({ content, creator }) => {
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
        <CommentButtonsPanel creatorId={creator._id}/>
      </div>
    </div>
  )
}

export default Comment