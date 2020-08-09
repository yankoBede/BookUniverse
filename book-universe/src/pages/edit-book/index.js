import React, { useState, useEffect } from 'react'
import Title from '../../components/title'
import PageLayout from '../../components/page-layout'
import getCookie from '../../utils/getCookie'
import BookForm from '../../components/book-form'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import publishNotification from '../../utils/publishNotification'

const EditBookPage = (props) => {
  const { addToast, removeToast } = useToasts()
  const [book, setBook] = useState()
  const [id, setId] = useState()
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const history = useHistory();

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

      const promise = await fetch(`http://localhost:9999/api/book/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            ...book,
              author: author.trim(),
              title: title.trim(),
              description: description.trim(),
              imageUrl: imageUrl.trim(),
              createdAt
          }),
          headers: {
              'Content-Type': 'application/json',
              'x-auth-token': getCookie('x-auth-token')
          }
      })

      publishNotification(`Book ${title} has been updated`, 'error', addToast, removeToast)

      history.goBack()
  }

    const getBook = async () => {
        const promise = await fetch(`http://localhost:9999/api/book`)
        const books = await promise.json()
        const book = books.filter(x => x._id === props.match.params.bookId)[0]
        console.log(book)
    
        setId(book._id)
        setAuthor(book.author) 
        setTitle(book.title) 
        setDescription(book.description) 
        setImageUrl(book.imageUrl) 
        setCreatedAt(book.createdAt)
        setBook(book)
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