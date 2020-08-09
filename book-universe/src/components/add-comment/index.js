import React, { useState, useContext } from 'react'
import styles from './index.module.css'
import UserContext from '../../Context'
import TextArea from '../../components/textarea'
import getCookie from '../../utils/getCookie'
import { useToasts } from 'react-toast-notifications'
import publishNotification from '../../utils/publishNotification'

const AddCommnet = (props) => {
    const [content, setContent] = useState()
    const context = useContext(UserContext);
    const { addToast, removeToast } = useToasts()

    const sumbitCommentHandler = async (event) =>  {
        event.preventDefault();

        if(!content) {
            publishNotification('Please fill your comment', 'error', addToast, removeToast)
            return
        } 

        const createdAt = new Date()

        const promise = await fetch('http://localhost:9999/api/comment', {
        method: 'POST',
        body: JSON.stringify({
            content,
            createdAt,
            book: props.bookId
        }),
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getCookie('x-auth-token')
        }
        })

        props.setAddedComment(content)
        setContent('')
        publishNotification('Your comment was added successfully', 'success', addToast, removeToast)
    }

    if (context.user.loggedIn) {
        return (
            <div className={styles['add-comment-wrapper']}>
                <form onSubmit={sumbitCommentHandler}>
                    <TextArea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        id="title"
                        divClass="form-group"
                        inputClass="form-control"
                        name="title"
                        placeholder="Fill your comment"/>
                    <div className={styles['comment-button']}>
                        <button className="btn btn-info">Comment</button>
                    </div>
                </form>
            </div>
        )
    } else {
        return null
    }
    
}

export default AddCommnet