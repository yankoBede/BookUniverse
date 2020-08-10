import React, { useState, useEffect } from 'react'
import UserContext from './Context'
import getCookie from './utils/getCookie'
import './index'

const App = (props) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const logIn = (user) => {
    setUser({
      ...user,
      loggedIn: true
    })
  }

  const logOut = () => {
    document.cookie = "x-auth-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    setUser({
      loggedIn: false
    })

  }

  useEffect(() => {
    const token = getCookie('x-auth-token')

    if(!token) {
      logOut()
      setLoading(false)
      return
    }

    fetch('http://localhost:9999/api/user/verify', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    }).then(promise => {
      return promise.json()
    }).then(response => {
      if(response.status) {
        logIn({
          username: response.user.username,
          id: response.user._id
        })
      } else {
        logOut()
      }
      setLoading(false)
    })
  }, [])

   if (loading) {
     return (
       <img className='img' src='https://media.tenor.com/images/0a000667c5aab43ac265d8c86a4bb310/tenor.gif' alt='Loading' />
     )
   }

  return (
    <UserContext.Provider value={{
      user,
      logIn,
      logOut
    }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default App