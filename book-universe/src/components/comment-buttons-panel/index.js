import React, { useContext } from 'react'
import styles from './index.module.css'
import UserContext from '../../Context'
import getCookie from '../../utils/getCookie'

const CommentButtonsPanel = (props) => {
    console.log(props)
    const context = useContext(UserContext);

    const deleteCommentHandler = async () => {
        const promise = await fetch(`http://localhost:9999/api/comment/${props.commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getCookie('x-auth-token')
            }
    })

    const response = await promise.json();
    }

    if (context.user.isLogged || context.user.id === props.creatorId) {
        return (        
            <div className={styles.buttons}>
                <button type="button" className="btn btn-primary button-distance btn-sm">Edit</button>
                <button type="button" onClick={deleteCommentHandler} className="btn btn-danger button-distance btn-sm">Delete</button>
            </div>
        )
    } else {
        return null
    }

}

export default CommentButtonsPanel