import React from 'react'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import Books from '../../components/books'
import ErrorBoundary from '../../ErrorBoundary'

const TopBooksList = () => {
    return (
      <PageLayout>
        <Title title="Top read books" />
        <ErrorBoundary>
          <Books topBooks={true} />
        </ErrorBoundary>
      </PageLayout>
    )
}

export default TopBooksList