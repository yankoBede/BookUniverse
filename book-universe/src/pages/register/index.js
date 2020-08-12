import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom"
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import Input from '../../components/input';
import authenticate from '../../utils/authenticate'
import { useToasts } from 'react-toast-notifications'
import publishNotification from '../../utils/publishNotification'
import UserContext from '../../Context'

const RegisterPage = () => {
  const { addToast, removeToast } = useToasts()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const history = useHistory()
  const context = useContext(UserContext);
 
  const usernameChange = (event) => {
    setUsername(event.target.value)
  }

  const usernameBlur = (event) => {
    const value = event.target.value;
    const regex = /^[0-9a-zA-Z(\-)]+$/;

    if (value.length < 5 || value.length > 20) {
      publishNotification('Username must be between 5 and 20 characters', 'error', addToast, removeToast)
    } 
    
    setUsername(value)
  }

  const passwordChange = (event) => {
    setPassword(event.target.value)
  }

  const rePasswordChange = (event) => {
    setRePassword(event.target.value)
  }

  const onPasswordBlur = (event) => {
    const value = event.target.value;
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

    if (!value.match(regex)) {
      publishNotification('Password must minimum 8 characters and at least 1 alphabet, 1 mumber and 1 special symbols', 'error', addToast, removeToast)
    }  else {
        setPassword(value)
    }
  }

  const handlerSubmit = async (event) =>  {
    event.preventDefault();

    if (!username || !password || !rePassword) {
      publishNotification('Please fill all the fields!', 'error', addToast, removeToast)
      return
    }

    if(password !== rePassword) {
      publishNotification('Password and Re-Password don\'t match', 'error', addToast, removeToast)
      return
    }

    await authenticate('http://localhost:9999/api/user/register', {
        username,
        password
      }, (user) => {
        publishNotification('You registered successfully!', 'success', addToast, removeToast)
        context.logIn(user) 
        history.push('/')
      }, e => {
        if(e.message.message) {
          publishNotification('Username is required', 'error', addToast, removeToast)
        } else if (e.message.code === 11000) {
          publishNotification('Username is already taken', 'error', addToast, removeToast)
        } else if(e.message) {
          publishNotification(e.message.toString(), 'error', addToast, removeToast)
        }
      }
    )
  }

  return (
    <PageLayout>
      <div className=" w-100">
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
                <Title title="Register" />
                <form onSubmit={handlerSubmit}>
                  <Input
                    value={username}
                    onChange={usernameChange}
                    onBlur={usernameBlur}
                    label="Username"
                    id="username"
                    divClass="form-group"
                    inputClass="form-control"
                    type="text"
                    placeholder="username"/>
                  <Input
                    value={password}
                    onBlur={onPasswordBlur}
                    onChange={passwordChange}
                    label="Password"
                    id="password"
                    divClass="form-group"
                    inputClass="form-control"
                    type="password"
                    placeholder="**************"/>
                  <Input
                    value={rePassword}
                    onChange={rePasswordChange}
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


export default RegisterPage