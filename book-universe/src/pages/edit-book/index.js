import React, { useState, useEffect } from 'react'
import Title from '../../components/title'
import PageLayout from '../../components/page-layout'
import getCookie from '../../utils/getCookie'
import BookForm from '../../components/book-form'
import { useHistory } from "react-router-dom"

const EditBookPage = (props) => {
  const [id, setId] = useState()
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const history = useHistory();

  const submitHandler = async (e) => {
      e.preventDefault()

      const promise = await fetch(`http://localhost:9999/api/book/${id}`, {
          method: 'PUT',
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
      history.goBack()
  }

    const getBook = async () => {
        const promise = await fetch(`http://localhost:9999/api/book`)
        const books = await promise.json()
        const book = books.filter(x => x._id === props.match.params.bookId)[0]
    
        setId(book._id)
        setAuthor(book.author) 
        setTitle(book.title) 
        setDescription(book.description) 
        setImageUrl(book.imageUrl) 
        setCreatedAt(book.createdAt)
      }
      
      useEffect( () => {
        getBook()
      },[])
 
    return (
      <PageLayout>
        <div className="row">
            <div className="col-md-4"/>
            <div className="col-md-4">
                <Title title="Edit Book Page" />
                <BookForm  
                submitHandler={submitHandler}
                pageTitle="Edit Book Page"
                buttonText="Update"
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

export default EditBookPage