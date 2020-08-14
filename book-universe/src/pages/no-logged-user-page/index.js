import React from 'react'
import PageLayout from '../../components/page-layout'
import styles from './index.module.css'
 
const NoLoggedUser = () => {
  return (
    <PageLayout>
      <div className={styles.div}>
          <div>
              <h1 className={styles.h1}>Come and find all the books <span className="text-highlighted"> you haven't known you want to read!</span></h1>
          </div>
          <img className="center" src="https://images.indianexpress.com/2020/04/books_759.jpg" alt="no-logged-user"/>
      </div>
    </PageLayout>
  )
}

export default NoLoggedUser