import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Moikka!'

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

export const notificationAddAndRemove = (msg, time) => {
  return async (dispatch) => {
    dispatch(notificationAdd(msg))
    setTimeout(() => {
      dispatch(notificationRemove())
    }, time * 1000)
  }
}

export const { notificationAdd, notificationRemove } = notificationSlice.actions
export default notificationSlice.reducer
