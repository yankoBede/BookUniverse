import React, { useState, useEffect } from 'react'
import Title from '../../components/title'
import PageLayout from '../../components/page-layout'
import TextArea from '../../components/textarea';
import getCookie from '../../utils/getCookie'
import { useHistory, useParams } from 'react-router-dom';
import styles from './index.module.css'
import { useToasts } from 'react-toast-notifications'
import publishNotification from '../../utils/publishNotification'

const EditCommentPage = (props) => {
    const { commentId } = useParams();
    const { addToast, removeToast } = useToasts()
    const [content, setContent] = useState('')
    const history = useHistory();
    const [comment, setComment] = useState('')

    const onSubmitHadler = async (event) =>  {
        event.preventDefault();

        if (!content.trim()) {
          publishNotification('The comment is empty!', 'error', addToast, removeToast)
          return
        }

        await fetch(`http://localhost:9999/api/comment/${commentId}`, {
          method: 'PUT',
          body: JSON.stringify({
            ...comment,
            content: content.trim()
          }),
          headers: {
              'Content-Type': 'application/json',
              'x-auth-token': getCookie('x-auth-token')
          }
        })

        publishNotification('Your comment is updated successfully!', 'info', addToast, removeToast)
   
        history.goBack()
    }

    useEffect(() => {
      getComment()  
    }, [])

    const getComment = async (props) => {
      const promise = await fetch(`http://localhost:9999/api/comment`)
      const comments = await promise.json()
      const currentComment = comments.filter(x => x._id === commentId)[0]
      setContent(currentComment.content)
      setComment(currentComment) 
    }

    return (
      <PageLayout>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <Title title="Edit a comment" />
            <form onSubmit={onSubmitHadler}>
              <TextArea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                id="title"
                divClass="form-group"
                inputClass="form-control"
                name="title"
                placeholder="Fill your comment"/>
              <div className={styles['buttons-cotainer']}>
                <button className="btn btn-primary">Edit</button>
              </div>
            </form>
          </div>
        </div>
      </PageLayout>
      )
}
  
export default EditCommentPage