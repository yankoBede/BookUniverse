import React, { Component } from 'react'
import PageLayout from '../../components/page-layout'
import styles from './index.module.css'
import Title from '../../components/title'
import Books from '../../components/books'
import UserContext from '../../Context'

class BooksList extends Component {
  constructor(props) {
    super(props)
  }

  static contextType = UserContext

  render() {

    return (
      <PageLayout>
        <Title title="Books" />
        <Books />
      </PageLayout>
    )
  }
}

export default BooksList
