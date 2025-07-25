import {useNotificationValue} from '../notificationContext'

const Notification = () => {
    const notification = useNotificationValue()
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5
    }
    if (notification === '') {
        return (
            <div>
            </div>
        )
    }
    return (
        <div style={style}>
            {notification}
        </div>
    )
}

export default Notification
