import React, { Component } from 'react'
import Title from '../../components/title'
import PageLayout from '../../components/page-layout'
import Input from '../../components/input';
import TextArea from '../../components/textarea';
import getCookie from '../../utils/getCookie'

class AddNewBookPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      author: "",
      title: "",
      description: "",
      imageUrl: ""
    }
  }

  onChange = (event, type) => {
    const newState = {}
    newState[type] = event.target.value

    this.setState(newState)
  }

  submitHandler = async (e) => {
    e.preventDefault()

    const {
      author,
      title,
      description,
      imageUrl
    } = this.state

    console.log(      author,
      title,
      description,
      imageUrl)

    const createdAt = Date.now()

    const promise = await fetch('http://localhost:9999/api/book', {
      method: 'POST',
      body: JSON.stringify({
        author,
        title,
        description,
        imageUrl,
        createdAt
      }),
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:9999/',
          'Access-Control-Allow-Credentials': true
      }
    })

    const response = await promise.json();
    console.log(response)
  }

  render() {
    const {
        author,
        title,
        description,
        imageUrl
    } = this.state

    return (
      <PageLayout>
 
    <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
        <Title title="Add a new book" />
            <form onSubmit={this.submitHandler}>
                <Input
                    value={title}
                    onChange={(e) => this.onChange(e, 'title')}
                    label="Title"
                    id="title"
                    name="title"
                    divClass="form-group"
                    inputClass="form-control"
                    type="text"
                    placeholder="The book title is..."/>
                <Input
                    value={author}
                    onChange={(e) => this.onChange(e, 'author')}
                    label="Author"
                    id="author"
                    name="author"
                    divClass="form-group"
                    inputClass="form-control"
                    type="text"
                    placeholder="The book author is..."/>
                <TextArea 
                    value={description}  
                    name="description" 
                    id="description" 
                    divClass="form-group"
                    inputClass="form-control"
                    placeholder="A little bit information about the book." 
                    required onChange={(e) => this.onChange(e, 'description')}>
                </TextArea>
                <Input
                    value={imageUrl}
                    onChange={(e) => this.onChange(e, 'imageUrl')}
                    label="Image Url"
                    id="imageUrl"
                    name="imageUrl"
                    divClass="form-group"
                    inputClass="form-control"
                    type="text"
                    placeholder="https://..."/>

                <button className="btn btn-primary">Create</button>
            </form>
        </div>
        </div>

      </PageLayout>
    )
  }
}

export default AddNewBookPage