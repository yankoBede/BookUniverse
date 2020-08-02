import React, { useContext } from 'react'
import styles from './index.module.css'
import UserContext from '../../Context'

const CommentButtonsPanel = (props) => {
    const context = useContext(UserContext);

    if (context.user.isLogged || context.user.id === props.creatorId) {
        return (        
            <div className={styles.buttons}>
                <button type="button" className="btn btn-primary button-distance btn-sm">Edit</button>
                <button type="button" className="btn btn-danger button-distance btn-sm" >Delete</button>
            </div>
        )
    } else {
        return null
    }

}

export default CommentButtonsPanel