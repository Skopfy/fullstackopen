import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notificationAddAndRemove } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const credentials = { username: username, password: password }
      dispatch(loginUser(credentials))
      setUsername('')
      setPassword('')
      const msg = { message: `${user.username} Successfully logged in (Redux).`, cla: 'success' }
      dispatch(notificationAddAndRemove(msg, 5))
    } catch (exception) {
      const msg = { message: 'Wrong credentials (Redux).', cla: 'error' }
      dispatch(notificationAddAndRemove(msg, 5))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
