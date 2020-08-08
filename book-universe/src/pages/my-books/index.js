import React from 'react'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import Books from '../../components/books'

const AddedByMeBooksList = (props) => {
    return (
      <PageLayout>
        <Title title="Books added by me" />
        <Books addedByMe={true} />
      </PageLayout>
    )
}

export default AddedByMeBooksList