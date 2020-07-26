import React, { Component } from 'react'
import styles from './index.module.css'
import Comments from '../comments'
 
class BookDetail extends Component {
    constructor(props) {
      super(props)
 
      this.state = {
        book: null
      }
    }
  
    getBook = async () => {
      const promise = await fetch(`http://localhost:9999/api/book`)
      const books = await promise.json()
      const book = books.filter(x => x._id === this.props.id)[0]

      this.setState({
        book
      }) 
    }
  
    async componentDidMount() {
       await this.getBook()
    }

    onCommentClick = (event) => {
      event.preventDefault()
      console.log(this.props)
       
    }
  
    render() {
      if(!this.state.book) {
        return <p><strong className="infoType"> LOADING...</strong> </p>
      }
      else {
        return (
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
        )
      }
    

    }
  }
  
  export default BookDetail
  