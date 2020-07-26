import React from 'react'
import styles from './index.module.css'

const Comment = ({ content, creator }) => {
  return (
    <div className={styles.container}>
      <div>
            
            <small>
            [04.05.2020]
        </small>
            <strong>
              <i> {creator.username}: </i>
            </strong>
            <small>
             {content} 
        </small>
        <div className={styles.buttons}>
          <button type="button" className="btn btn-primary button-distance btn-sm">Edit</button>
          <button type="button" className="btn btn-danger button-distance btn-sm" >Delete</button>
        </div>
      </div>
    </div>
  )
}

export default Comment