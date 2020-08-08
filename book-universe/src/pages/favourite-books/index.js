import React from 'react'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import Books from '../../components/books'

const FavouriteBooksList = (props) => {
    return (
      <PageLayout>
        <Title title="My favourite books" />
        <Books onlyLiked={true} />
      </PageLayout>
    )
}

export default FavouriteBooksList