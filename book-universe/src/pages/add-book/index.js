import React, { useState } from 'react'
import Title from '../../components/title'
import PageLayout from '../../components/page-layout'
import Input from '../../components/input';
import TextArea from '../../components/textarea';
import getCookie from '../../utils/getCookie'

const AddNewBookPage = () => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()

    const createdAt = Date()

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
          'x-auth-token': getCookie('x-auth-token')
      }
    })

    const response = await promise.json();
  }

 
    return (
      <PageLayout>
 
    <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
        <Title title="Add a new book" />
            <form onSubmit={submitHandler}>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    label="Title"
                    id="title"
                    name="title"
                    divClass="form-group"
                    inputClass="form-control"
                    type="text"
                    placeholder="The book title is..."/>
                <Input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
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
                    required 
                    onChange={(e) => setDescription(e.target.value)}>
                </TextArea>
                <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
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

export default AddNewBookPage