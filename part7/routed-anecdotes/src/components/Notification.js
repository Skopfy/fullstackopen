const Notification = ({ message, cla }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={cla}>
      {message}
    </div>
  )
}

export default Notification