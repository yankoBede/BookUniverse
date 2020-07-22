import React, { Component } from 'react'
import Title from '../../components/title'

import PageLayout from '../../components/page-layout'
import Input from '../../components/input';

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
    console.log(this.state)
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
            <form>
                <Input
                    value={title}
                    onChange={(e) => this.onChange(e, 'title')}
                    label="Title"
                    id="title"
                    divClass="form-group"
                    inputClass="form-control"
                    type="text"
                    placeholder="The book title is..."/>
                <Input
                    value={author}
                    onChange={(e) => this.onChange(e, 'author')}
                    label="Author"
                    id="author"
                    divClass="form-group"
                    inputClass="form-control"
                    type="text"
                    placeholder="The book author is..."/>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea value={description}  name="description" id="description" cols="30" rows="10" className="form-control cause-description"
                        placeholder="A little bit information about the movie." required onChange={(e) => this.onChange(e, 'description')}></textarea>
                </div>
                <Input
                    value={imageUrl}
                    onChange={(e) => this.onChange(e, 'imageUrl')}
                    label="Image Url"
                    id="imageUrl"
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