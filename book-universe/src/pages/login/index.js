import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Title from '../../components/title'
import PageLayout from '../../components/page-layout'
import Input from '../../components/input';
import authenticate from '../../utils/authenticate'
import UserContext from '../../Context'
import { useToasts } from 'react-toast-notifications'
import publishNotification from '../../utils/publishNotification'

const LoginPage = (props) => {
  const { addToast, removeToast } = useToasts()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const context = useContext(UserContext);
  const history = useHistory()

  const submitHandler = async (event) => {
    event.preventDefault();

    await authenticate('http://localhost:9999/api/user/login', {
      username,
      password
      }, (user) => {
        publishNotification('You logged successfully', 'success', addToast, removeToast)
        context.logIn(user) 
        history.push('/')
      }, e => {
        publishNotification(e.message, 'error', addToast, removeToast)
      }
    )
  }

  return (<PageLayout>
    
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <Title title="Login" />
 
            <form onSubmit={submitHandler}>
              <Input
                value={username}
                onChange={e => setUsername(e.target.value)}
                label="Username"
                id="username"
                divClass="form-group"
                inputClass="form-control"
                type="text"
                placeholder="usermail@domain.com"/>
              <Input
                value={password}
                onChange={e => setPassword(e.target.value)}
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
      </PageLayout>)
  
}

export default LoginPage