import React from 'react'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import Books from '../../components/books'
import ErrorBoundary from '../../ErrorBoundary'

const AddedByMeBooksList = (props) => {
    return (
      <PageLayout>
        <Title title="Books added by me" />
        <ErrorBoundary>
          <Books addedByMe={true} />
        </ErrorBoundary>
      </PageLayout>
    )
}

export default AddedByMeBooksList