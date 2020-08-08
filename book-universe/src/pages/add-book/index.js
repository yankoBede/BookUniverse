import React, { useState } from 'react'
import Title from '../../components/title'
import PageLayout from '../../components/page-layout'
import BookForm from '../../components/book-form';
import getCookie from '../../utils/getCookie'
import { useHistory } from "react-router-dom"

const AddNewBookPage = () => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault()

    const createdAt = new Date()

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
    history.push('/')
  }

 
    return (
      <PageLayout>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <Title title="Add a new book" />
            <BookForm  
                    submitHandler={submitHandler}
                    buttonText="Create"
                    title={title}
                    setTitle={setTitle}
                    author={author}
                    setAuthor={setAuthor}
                    description={description}
                    setDescription={setDescription}
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}/>
          </div>
        </div>
      </PageLayout>
    )
  
}

export default AddNewBookPage