import React from 'react'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import Books from '../../components/books'

const BooksList = () => {
    return (
      <PageLayout>
        <Title title="Books" />
        <Books allBooks={true}/>
      </PageLayout>
    )
}

export default BooksList