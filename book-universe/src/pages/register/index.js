import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom"
import PageLayout from '../../components/page-layout'
import Title from '../../components/title'
import Input from '../../components/input';
import authenticate from '../../utils/authenticate'
import UserContext from '../../Context'
import { useToasts } from 'react-toast-notifications'

const RegisterPage = (props) => {
  const { addToast, removeToast } = useToasts()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const context = useContext(UserContext);
  const history = useHistory()
 
  const usernameChange = (event) => {
    setUsername(event.target.value)
  }

  const usernameBlur = (event) => {
    const value = event.target.value;
    const regex = /^[0-9a-zA-Z(\-)]+$/;

    if (value.length < 5 || value.length > 12) {
      publishNotification('Username must be between 5 and 12 characters', 'error')
    } else if (!value.match(regex)) {
      publishNotification('Username must contain only letters and numbers', 'error')
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
      publishNotification('Password must minimum 8 characters and at least 1 alphabet, 1 mumber and 1 special symbols', 'error')
    }  else {
        setPassword(value)
    }
  }

  const handlerSubmit = async (event) =>  {
    event.preventDefault();

    if (!username || !password || !rePassword) {
      publishNotification('Please fill all the fields!', 'error')
      return
    }

    if(password !== rePassword) {
      publishNotification('Password and Re-Password don\'t match', 'error')
      return
    }

    await authenticate('http://localhost:9999/api/user/register', {
        username,
        password
      }, (user) => {
        context.logIn(user) 
        publishNotification('You registered successfully!', 'success')
        history.push('/')
      }, e => {
        if(e.message.message) {
          const toast = addToast('Username is required', { appearance: 'error' })
          setInterval(function() {
            removeToast(toast)
          }, 3000);
        } else if (e.message.code === 11000) {
          const toast = addToast('Username is already taken', { appearance: 'error' })
          setInterval(function() {
            removeToast(toast)
          }, 3000);
        } else if(e.message) {
          const toast = addToast(e.message.toString(), { appearance: 'error' })
          setInterval(function() {
            removeToast(toast)
          }, 3000);
        }
      }
    )
  }

  const publishNotification = (message, notificationType) => {
    const toast = addToast(message, { appearance: notificationType })

    setInterval(function() {
      removeToast(toast)
    }, 3000);
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