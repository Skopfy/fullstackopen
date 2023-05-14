import React from 'react'
import { useSelector } from 'react-redux'

const Notification = ({ message, cla }) => {
  const notification = useSelector((state) => state.notification)
  if (notification === '') {
    return <div></div>
  } else {
    return <div className={cla}>{notification}</div>
  }
}

export default Notification
