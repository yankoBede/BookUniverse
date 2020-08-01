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
      usernameError: false,
      usernameErrorMessage: "",
      password: "",
      passwordError: false,
      passwordErrorMessage: "",
      rePassword: "",
      rePasswordError: false,
      rePasswordErrorMessage: ""
    }
  }

  static contextType = UserContext

  usernameChange = (event) => {
    const value = event.target.value;
    const regex = /^[0-9a-zA-Z(\-)]+$/;

    if (value.length < 5 || value.length > 12) {
      this.setState({ 
        usernameError : true,
        usernameErrorMessage: 'Username must be between 5 and 12 characters',
        username: event.target.value
      })
    } else if (!value.match(regex)) {
      this.setState({ 
        usernameError : true,
        usernameErrorMessage: 'Username must contain only letters and numbers',
        username: value
      })
    }  else {
      this.setState({ 
        usernameError: false,
        usernameErrorMessage: "",
        username: value
      })
    }
  }

  passwordChange = (event) => {
    const value = event.target.value;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

    if (!value.match(regex)) {
      this.setState({ 
        passwordError : true,
        passwordErrorMessage: 'Password must minimum 8 characters and at least 1 alphabet, 1 mumber and 1 special symbols',
        password: value
      })
    }  else {
      this.setState({ 
        passwordError: false,
        passwordErrorMessage: "",
        password: value
      })
    }
  }

  rePasswordChange = (event) => {
    const rePassword = event.target.value;
    const password = this.state.password;

    this.validateRepassword(password, rePassword)
  }

  onPasswordBlur = () => {
    const password = this.state.password;
    const rePassword = this.state.rePassword;
    
    this.validateRepassword(password, rePassword)
  }

  validateRepassword = (passwordValue, rePasswordValue) => {
    if(rePasswordValue !== passwordValue) {
      this.setState({ 
        rePasswordError : true,
        rePasswordErrorMessage: 'Password and Re-Password don\'t match',
        rePassword: rePasswordValue
      })
    } else {
      this.setState({ 
        rePasswordError: false,
        rePasswordErrorMessage: "",
        rePassword: rePasswordValue
      })
    }
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
        if (e.message.code === 11000) {
          this.setState({ 
            usernameError : true,
            usernameErrorMessage: 'Username is already taken',
          })
        }
      }
    )
  }



  render() {
    const {
      username,
      usernameError,
      usernameErrorMessage,
      password,
      passwordError,
      passwordErrorMessage,
      rePasswordError,
      rePasswordErrorMessage,
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
                onChange={this.usernameChange}
                onBlur={this.usernameBlur}
                label="Username"
                id="username"
                divClass="form-group"
                inputClass="form-control"
                type="text"
                error={usernameError}
                errorMessage={usernameErrorMessage}
                placeholder="username"/>
              <Input
                value={password}
                onBlur={this.onPasswordBlur}
                onChange={this.passwordChange}
                label="Password"
                id="password"
                divClass="form-group"
                inputClass="form-control"
                type="password"
                error={passwordError}
                errorMessage={passwordErrorMessage}
                placeholder="**************"/>
              <Input
                value={rePassword}
                onChange={this.rePasswordChange}
                label="Re-Password"
                id="rePassword"
                divClass="form-group"
                inputClass="form-control"
                type="password"
                error={rePasswordError}
                errorMessage={rePasswordErrorMessage}
                placeholder="**************"/>
                {(usernameError || passwordError || rePasswordError 
                || !username.length || !password.length || !rePassword.length) ?
                  <button className="btn btn-primary" disabled>Register</button> :
                  <button className="btn btn-primary">Register</button>
                } 
                
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