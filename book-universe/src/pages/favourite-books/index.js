import React from 'react'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import Books from '../../components/books'
import ErrorBoundary from '../../ErrorBoundary'

const FavouriteBooksList = (props) => {
    return (
      <PageLayout>
        <Title title="My favourite books" />
        <ErrorBoundary>
          <Books onlyLiked={true} />
        </ErrorBoundary>
      </PageLayout>
    )
}

export default FavouriteBooksList