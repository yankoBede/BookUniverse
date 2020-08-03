import React, { useContext } from 'react'
import { useHistory } from "react-router-dom"
import styles from './index.module.css'
import UserContext from '../../Context'
import getCookie from '../../utils/getCookie'
import { useToasts } from 'react-toast-notifications'

const CommentButtonsPanel = (props) => {
    const { addToast, removeToast } = useToasts()
    const context = useContext(UserContext);
    const history = useHistory();

    const editCommentHandler = async (event) => {
        event.preventDefault()
        history.push(`/books/${props.book._id}/comment/${props.commentId}`)
    }

    const publishNotification = (message, notificationType) => {
        const toast = addToast(message, { appearance: notificationType })
    
        setInterval(function() {
          removeToast(toast)
        }, 3000);
    }

    const deleteCommentHandler = async (event) => {
        event.preventDefault()
        const promise = await fetch(`http://localhost:9999/api/comment/${props.commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getCookie('x-auth-token')
            }
        })

        const response = await promise.json();
        props.setDeletedComment(props.commentId)

        publishNotification('Comment has been deleted', 'warning')
    }

    if (context.user.isLogged || context.user.id === props.creatorId) {
        return (        
            <div className={styles.buttons}>
                <button type="button" onClick={editCommentHandler} className="btn btn-primary button-distance btn-sm">Edit</button>
                <button type="button" onClick={deleteCommentHandler} className="btn btn-danger button-distance btn-sm">Delete</button>
            </div>
        )
    } else {
        return null
    }

}


export default CommentButtonsPanel