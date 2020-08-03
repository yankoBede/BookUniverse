import React, { useContext } from 'react'
import styles from './index.module.css'
import UserContext from '../../Context'
import TextArea from '../../components/textarea'

const AddCommnet = (props) => {
    const context = useContext(UserContext);

    if (context.user.loggedIn) {
        return (
            <div className={styles['add-comment-wrapper']}>
                <form onSubmit={props.sumbitCommentHandler}>
                    <TextArea
                        value={props.content}
                        onChange={props.onChangeHandler}
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