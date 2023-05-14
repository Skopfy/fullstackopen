import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: 'Moikka!',
  cla: 'success'
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationAdd(state, action) {
      return action.payload
    },
    // eslint-disable-next-line no-unused-vars
    notificationRemove(state, action) {
      return ''
    }
  }
})

export const notificationAddAndRemove = (notification, time) => {
  return async (dispatch) => {
    dispatch(notificationAdd(notification))
    setTimeout(() => {
      dispatch(notificationRemove())
    }, time * 1000)
  }
}

export const { notificationAdd, notificationRemove } = notificationSlice.actions
export default notificationSlice.reducer
