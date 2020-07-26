import React, { Component } from 'react'
import styles from './index.module.css'
import Comment from '../comment'

class Comments extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comments: []
    }
  }

  getComments = async () => {
    const promise = await fetch(`http://localhost:9999/api/comment`)
    const comments = await promise.json()
    this.setState({
        comments
    })
  }

  renderComments() {
    const { comments } = this.state

    return comments.map((comment) => {
        return (
          <Comment key={comment._id} {...comment} />
        )
      })
  }

  componentDidMount() {
    this.getComments()
  }

  render() {
    return (
      <div className={styles["comments-wrapper"]}>
        {this.renderComments()}
      </div>
    )
  }
}

export default Comments
