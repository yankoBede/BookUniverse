import React from 'react'
import Input from '../../components/input'
import TextArea from '../../components/textarea'
import styles from './index.module.css'

const BookForm = ({submitHandler, buttonText, title, setTitle, author, setAuthor, description, setDescription, imageUrl, setImageUrl}) => {

    return (
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
            <div className={styles['buttons-cotainer']}>
                <button className="btn btn-primary">{buttonText}</button>
            </div>
        </form>
    )
}

export default BookForm