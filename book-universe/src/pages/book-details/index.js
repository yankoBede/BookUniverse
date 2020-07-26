import React, { Component } from 'react'
import PageLayout from '../../components/page-layout'
import Comments from '../../components/comments'
import Title from '../../components/title'


class BookDetails extends Component  {
  constructor(props) {
    super(props)

    this.state = {
      book: null
    }
  }

  getBook = async () => {
    const promise = await fetch(`http://localhost:9999/api/book`)
    const books = await promise.json()
    const book = books.filter(x => x._id === this.props.match.params.id)[0]

    this.setState({
      book
    }) 
  }

  async componentDidMount() {
     await this.getBook()
  }

  onCommentClick = (event) => {
    event.preventDefault()
    console.log('hooiiii')
    this.props.history.push(`/books/${this.state.book._id}/comment`)
  }

  render() {
    if(!this.state.book) {
        return (<PageLayout>
          <p><strong className="infoType"> LOADING...</strong> </p>
          </PageLayout>)
        }
      else {
        return (<PageLayout>
            <div className="row single-trek-details text-center">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-3">
                        <img className="details-img" src={this.state.book.imageUrl}/>
                        <p></p>
                        <div>
                            <button type="button" className="btn btn-success button-distance">Edit</button>
                            <button type="button" className="btn btn-danger button-distance" >Delete</button>
                            <button type="button" className="btn btn-warning">Like</button>
                            <button type="button" className="btn btn-secondary">Dislike</button>
                            <button type="button" className="btn btn-info" onClick={this.onCommentClick}>Comment</button>
                        </div>
                    </div>
                    <div className="col-6">
                        <div>
                            <h2 className="display-5">{this.state.book.title}</h2>
                            <h4>{this.state.book.author}</h4>
                            <br></br>
                            <p><strong className="book-description">Description:</strong> {this.state.book.description}</p>
                        </div>

                        <p><strong className="bokk-description">Comments:</strong></p>
                        <Comments />
                    </div>
                </div>
            </div>
            </PageLayout>)
     }
  }
}

  export default BookDetails
