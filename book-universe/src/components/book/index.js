import React from 'react'
import styles from './index.module.css'

const Book = ({title, author, imageUrl}) => {
  return (
    <div className={styles.book}>
          <h4>{title}</h4>
          <img className={styles['book-image']} src={imageUrl} alt={title}/>
          <p>{author}</p> 
          <button className="btn btn-info">Read More</button>
    </div>
  )
}

export default Book