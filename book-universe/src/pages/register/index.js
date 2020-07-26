import React, { Component } from 'react'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import Input from '../../components/input';
import authenticate from '../../utils/authenticate'
import UserContext from '../../Context'

class RegisterPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: "",
      rePassword: ""
    }
  }

  static contextType = UserContext

  onChange = (event, type) => {
    const newState = {}
    newState[type] = event.target.value

    this.setState(newState)
  }

  handlerSubmit = async (event) =>  {
    event.preventDefault();

    const {
      username,
      password
    } = this.state

    await authenticate('http://localhost:9999/api/user/register', {
        username,
        password
      }, (user) => {
        this.context.logIn(user) 
        this.props.history.push('/')
      }, e => {
        console.log('Error', e)
      }
    )
  }


  render() {
    const {
      username,
      password,
      rePassword
    } = this.state

    return (
      <PageLayout>
        <div className=" w-100">
    <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
            <Title title="Register" />
            <form onSubmit={this.handlerSubmit}>
              <Input
                value={username}
                onChange={(e) => this.onChange(e, 'username')}
                label="Username"
                id="username"
                divClass="form-group"
                inputClass="form-control"
                type="text"
                placeholder="username"/>
              <Input
                value={password}
                onChange={(e) => this.onChange(e, 'password')}
                label="Password"
                id="password"
                divClass="form-group"
                inputClass="form-control"
                type="password"
                placeholder="**************"/>
              <Input
                value={rePassword}
                onChange={(e) => this.onChange(e, 'rePassword')}
                label="Re-Password"
                id="rePassword"
                divClass="form-group"
                inputClass="form-control"
                type="password"
                placeholder="**************"/>
                <button className="btn btn-primary">Register</button>
            </form>
            <p>Already Registered? <a href="/login">Login</a>.</p>
        </div>
    </div>
</div>
      </PageLayout>
    )
  }
}

export default RegisterPage