import React from 'react'
import Title from '../../components/title'
import Input from '../../components/input'
import TextArea from '../../components/textarea'

const BookForm = ({submitHandler, pageTitle, buttonText, title, setTitle, author, setAuthor, description, setDescription, imageUrl, setImageUrl}) => {

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
            <button className="btn btn-primary">{buttonText}</button>
        </form>
    )
}

export default BookForm