import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { notificationAddAndRemove } from '../reducers/notificationReducer'

const Logout = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(logout())
    const msg = { message: 'Successfully logged out (Redux).', cla: 'success' }
    dispatch(notificationAddAndRemove(msg, 5))
  }
  return (
    <p>
      {user.username} logged in{' '}
      <button id="logout-button" onClick={handleLogout}>
        logout
      </button>{' '}
    </p>
  )
}

export default Logout
