import React from 'react'
import PageLayout from '../../components/page-layout';
import styles from './index.module.css'

const ErrorPage = () => {
  return (
    <PageLayout>
      <div>
        <img class={styles["not-found-image"]} src="http://delo.gis-sofia.bg/uploads/assets/404.png" alt="404"/>
    </div>
    </PageLayout>
  )
}

export default ErrorPage