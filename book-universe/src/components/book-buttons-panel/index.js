import React, {useContext} from 'react'
import UserContext from '../../Context'

const BookButtonsPanel = (props) => {
    const context = useContext(UserContext);
    console.log('liked', props.isLiked)
    
    if (context.user.loggedIn) {
        if(props.isCreator) {
            return (
                <div>
                    <button type="button" onClick={props.onBookEditClick} className="btn btn-success button-distance">Edit</button>
                    <button type="button" className="btn btn-danger button-distance" >Delete</button>
                </div>
            )
        } else {
            if (props.isLiked) {
                return (                
                    <div>
                        <button type="button" onClick={props.onDislikeClick} className="btn btn-secondary">Dislike</button>
                    </div>
                    )
            } else {
                    return (                
                    <div>
                        <button type="button" onClick={props.onLikeClick} className="btn btn-warning">Like</button>
                    </div>
                    )
            }
        }
    }
    return null
}

export default BookButtonsPanel
