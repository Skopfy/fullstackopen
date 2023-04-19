import { createContext} from 'react'

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

export default NotificationContext