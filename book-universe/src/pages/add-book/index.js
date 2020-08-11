import React, { useState } from 'react'
import Title from '../../components/title'
import PageLayout from '../../components/page-layout'
import BookForm from '../../components/book-form';
import getCookie from '../../utils/getCookie'
import { useHistory } from "react-router-dom"
import { useToasts } from 'react-toast-notifications'
import publishNotification from '../../utils/publishNotification'

const AddNewBookPage = () => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const history = useHistory();
  const { addToast, removeToast } = useToasts()

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!author.trim() || !title.trim() || !description.trim() || !imageUrl.trim()) {
      publishNotification('Please fill all the fields', 'error', addToast, removeToast)
      return
    }

    if(!(imageUrl.startsWith('http://') || imageUrl.startsWith('https://'))) {
      publishNotification('Please add a valid image url', 'error', addToast, removeToast)
      return
    }

    await fetch('http://localhost:9999/api/book', {
      method: 'POST',
      body: JSON.stringify({
        author: author.trim(),
        title: title.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        createdAt: new Date()
      }),
      headers: {
          'Content-Type': 'application/json',
          'x-auth-token': getCookie('x-auth-token')
      }
    })

    publishNotification(`Book with title ${title.trim()} is created successfully!`, 'success', addToast, removeToast)
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