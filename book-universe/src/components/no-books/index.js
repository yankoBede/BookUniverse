import React from 'react'
import styles from './index.module.css'
 
const NoBooks = () => {
  return (
    <div className={styles.div}>
        <img src="https://media.istockphoto.com/vectors/shelf-vector-id165794808?k=6&m=165794808&s=612x612&w=0&h=14iBSQo-gCeY-I6DicAu3dndy_vua4NXXnj6fCgNdTw="/>
        <div>
            <h3 className={styles.h3}>No available books yet</h3>
        </div>
    </div>
  )
}

export default NoBooks