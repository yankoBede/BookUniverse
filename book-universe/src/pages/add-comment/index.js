import React, { useState, useh } from 'react'
import Title from '../../components/title'
import PageLayout from '../../components/page-layout'
import TextArea from '../../components/textarea';
import getCookie from '../../utils/getCookie'
import { useHistory } from 'react-router-dom';

const AddCommentPage = (props) => {
    const [content, setContent] = useState('')
    const history = useHistory();

    const onSubmitHadler = async (event) =>  {
        event.preventDefault();

        const createdAt = Date()

        const promise = await fetch('http://localhost:9999/api/comment', {
          method: 'POST',
          body: JSON.stringify({
            content,
            createdAt,
            book: props.match.params.bookId
          }),
          headers: {
              'Content-Type': 'application/json',
              'x-auth-token': getCookie('x-auth-token')
          }
        })

   
        history.goBack()
    }
  
    return (
      <PageLayout>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <Title title="Leave a comment for book" />
            <form onSubmit={onSubmitHadler}>
              <TextArea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                label="Leave a comment"
                id="title"
                divClass="form-group"
                inputClass="form-control"
                name="title"
                placeholder="Fill your comment"/>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </PageLayout>
      )
}
  
export default AddCommentPage