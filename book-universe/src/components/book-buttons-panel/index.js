import React, {useContext} from 'react'
import UserContext from '../../Context'
import styles from './index.module.css'

const BookButtonsPanel = (props) => {
    const context = useContext(UserContext);
    
    if (context.user.loggedIn) {
        if(props.isCreator) {
            return (
                <div>
                    <div className={styles['button-distance']}>
                        <button type="button" onClick={props.onBookEditClick} className="btn btn-success button-distance">Edit</button>
                        <button type="button" onClick={props.onDeleteClick} className="btn btn-danger button-distance" >Delete</button>
                    </div>
                </div>
            )
        } else {
            if (props.isLiked) {
                return (                
                    <div className={styles['button-distance']}>
                        <button type="button" onClick={props.onDislikeClick} className="btn btn-secondary">Dislike</button>
                    </div>
                    )
            } else {
                return (                
                <div className={styles['button-distance']}>
                    <button type="button" onClick={props.onLikeClick} className="btn btn-warning">Like</button>
                </div>
                )
            }
        }
    }
    return null
}

export default BookButtonsPanel
