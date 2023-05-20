import React from 'react'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if (notification.message === '') {
    return <div></div>
  } else {
    return <Alert variant={notification.cla}>{notification.message}</Alert>
  }
}

export default Notification
