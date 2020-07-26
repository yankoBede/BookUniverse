import React, { Component } from 'react'
import PageLayout from '../../components/page-layout'
 
import Title from '../../components/title'
import BookDetail from '../../components/book-details'

class BookDetails extends Component  {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <PageLayout>
        <BookDetail id={this.props.match.params.id}></BookDetail>
      </PageLayout>
    ) 
  }
}

export default BookDetails
