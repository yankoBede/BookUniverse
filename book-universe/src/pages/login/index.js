import React, { Component } from 'react'
import Title from '../../components/title'
import styles from './index.module.css'
import PageLayout from '../../components/page-layout'
import Input from '../../components/input';

class LoginPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: ""
    }
  }

  onChange = (event, type) => {
    const newState = {}
    newState[type] = event.target.value

    this.setState(newState)
  }

  submitHandler = async (event) =>  {
    event.preventDefault();

    const {
      username,
      password
    } = this.state

    const data = {
      "username": username,
      "password": password
    }


 

    const result = await fetch('http://localhost:9999/api/user/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
  }

  render() {
    const {
      username,
      password
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
                label="Email Address"
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
                divClass="form-group"
                inputClass="form-control"
                type="password"
                placeholder="**************"/>
                <button className="btn btn-success">Login</button>
            </form>
            <p>Don't have account yet? <a href="/register">Register</a>.</p>
        </div>
        </div>

      </PageLayout>
    )
  }
}

export default LoginPage