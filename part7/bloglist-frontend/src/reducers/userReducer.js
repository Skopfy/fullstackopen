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
    const loggedInUser = await loginService.login(user)
    blogService.setToken(loggedInUser.token)
    userService.setToken(loggedInUser.token)
    dispatch(setUser(loggedInUser))
    const msg = { message: `${user.username} Successfully logged in (Redux).`, cla: 'success' }
    dispatch(notificationAddAndRemove(msg, 5))
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(removeUser())
  }
}

export const { setUser, removeUser } = userSlice.actions
export default userSlice.reducer