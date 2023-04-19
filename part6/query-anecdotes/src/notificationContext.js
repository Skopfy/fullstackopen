import { createContext, useContext} from 'react'

const NotificationContext = createContext()

export const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET":
            return action.payload
        case "REMOVE":
            return ''
        default:
            return state
    }
}

export const useNotificationValue = () => {
    const counterAndDispatch = useContext(NotificationContext)
    return counterAndDispatch[0]
  }
  
  export const useNotificationDispatch = () => {
    const counterAndDispatch = useContext(NotificationContext)
    return counterAndDispatch[1]
  }

export default NotificationContext