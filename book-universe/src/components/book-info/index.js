import React from 'react'
import styles from './index.module.css'
import { useHistory } from 'react-router-dom';
 
const BookInfo = ({title, author, imageUrl, _id}) => {
  const history = useHistory();
  return (
    <div className={styles.book}>
          <h4>{title}</h4>
          <img className={styles['book-image']} src={imageUrl} alt={title}/>
          <p>{author}</p> 
          <button className="btn btn-info" onClick={() => history.push(`/books/${_id}`)}>Read More</button>
    </div>
  )
}

export default BookInfo