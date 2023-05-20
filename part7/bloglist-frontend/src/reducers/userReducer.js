import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'
import { notificationAddAndRemove } from '../reducers/notificationReducer'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    removeUser(state, action) {
      return null
    }
  }
})

export const loginUser = (user) => {
  return async (dispatch) => {
    loginService
      .login(user)
      .then((loggedInUser) => {
        window.localStorage.setItem(
          'loggedBlogAppUser',
          JSON.stringify(loggedInUser)
        )
        blogService.setToken(loggedInUser.token)
        userService.setToken(loggedInUser.token)
        dispatch(setUser(loggedInUser))
        const msg = {
          message: `${user.username} Successfully logged in (Redux).`,
          cla: 'success'
        }
        dispatch(notificationAddAndRemove(msg, 5))
      })
      .catch(() => {
        const msg = { message: 'Wrong credentials.', cla: 'danger' }
        dispatch(notificationAddAndRemove(msg, 5))
      })
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(removeUser())
    window.localStorage.removeItem('loggedBlogAppUser')
  }
}

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer
