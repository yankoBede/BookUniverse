import React, { Component } from 'react'
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import Input from '../../components/input';

class RegisterPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      rePassword: ""
    }
  }

  onChange = (event, type) => {
    const newState = {}
    newState[type] = event.target.value
    console.log(newState)

    this.setState(newState)
  }

  render() {
    const {
      email,
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
            <form>
              <Input
                value={email}
                onChange={(e) => this.onChange(e, 'email')}
                label="Email Address"
                id="email"
                divClass="form-group"
                inputClass="form-control"
                type="email"
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
              <Input
                value={rePassword}
                onChange={(e) => this.onChange(e, 'password')}
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