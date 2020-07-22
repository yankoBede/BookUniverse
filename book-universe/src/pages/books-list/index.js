import React from 'react'
import PageLayout from '../../components/page-layout'
import styles from './index.module.css'
import Title from '../../components/title'
import Books from '../../components/books'

const Publications = () => {

  return (
    <PageLayout>
      <Title title="Books" />
      <Books />
    </PageLayout>
  )
}

export default Publications
