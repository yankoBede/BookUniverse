import React from 'react'
import PageLayout from '../../components/page-layout'
 
import Title from '../../components/title'
import BookDetail from '../../components/book-details'

const BookDetails = (props) => {
  return (
 
    <PageLayout>
      <BookDetail id={props.match.params.id}></BookDetail>
    </PageLayout>
  )
}

export default BookDetails
