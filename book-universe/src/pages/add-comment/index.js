import React, { Component } from 'react'
import Title from '../../components/title'
import PageLayout from '../../components/page-layout'
import Input from '../../components/input';

class AddCommentPage extends Component {
    constructor(props) {
      super(props)
      
      this.state = {
        content: "",
        createdAt: ""
      }
    }
  
    onChange = (event, type) => {
      const newState = {}
      newState[type] = event.target.value
  
      this.setState(newState)
    }

    onSubmitHadler = async (event) =>  {
        event.preventDefault();
    
        const {
          content
        } = this.state
    }
  
    render() {
      const {
          content
      } = this.state
  
      return (
        <PageLayout>
   
      <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
          <Title title="Add a new book" />
              <form onSubmit={this.onSubmitHadler}>
                  <Input
                      value={content}
                      onChange={(e) => this.onChange(e, 'content')}
                      label="Title"
                      id="title"
                      divClass="form-group"
                      inputClass="form-control"
                      type="text"
                      placeholder="Fill your comment"/>
  
                  <button className="btn btn-primary">Create</button>
              </form>
          </div>
          </div>
  
        </PageLayout>
      )
    }
  }
  
  export default AddCommentPage