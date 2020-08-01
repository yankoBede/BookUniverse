import React, { Component } from 'react'
import Title from '../../components/title'
import styles from './index.module.css'
import PageLayout from '../../components/page-layout'
import Input from '../../components/input';
import authenticate from '../../utils/authenticate'
import UserContext from '../../Context'

class LoginPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: "",
      error: false,
      errorMessage: ""
    }
  }

  onChange = (event, type) => {
    this.setState({ 
      error: false,
      errorMessage: ""
    })

    const newState = {}
    newState[type] = event.target.value

    this.setState(newState)
  }

  static contextType = UserContext

  submitHandler = async (event) =>  {
    event.preventDefault();

    const {
      username,
      password
    } = this.state

    await authenticate('http://localhost:9999/api/user/login', {
      username,
      password
      }, (user) => {
        this.context.logIn(user) 
        this.props.history.push('/')
      }, e => {
        this.setState({ 
          error : true,
          errorMessage: "Login is unsuccessful! Please double-check your credentials"
        })
      }
    )
  }

  render() {
    const {
      username,
      password,
      error,
      errorMessage
    } = this.state

    return (

      <PageLayout>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <Title title="Login" />
            <form onSubmit={this.submitHandler}>
              <Input
                value={username}
                onChange={(e) => this.onChange(e, 'username')}
                label="Username"
                id="username"
                divClass="form-group"
                inputClass="form-control"
                type="text"
                placeholder="usermail@domain.com"/>
              <Input
                value={password}
                onChange={(e) => this.onChange(e, 'password')}
                label="Password"
                id="password"
                error={error}
                errorMessage={errorMessage}
                divClass="form-group"
                inputClass="form-control"
                type="password"
                placeholder="**************"/>
                {error ?
                  <button className="btn btn-success" disabled>Login</button> :
                  <button className="btn btn-success">Login</button>
                } 
              </form>
            <p>Don't have account yet? <a href="/register">Register</a>.</p>
          </div>
        </div>
      </PageLayout>
    )
  }
}

export default LoginPage