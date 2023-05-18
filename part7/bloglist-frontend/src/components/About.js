import React from 'react'
import { useSelector } from 'react-redux'

const About = () => {
  const user = useSelector((state) => state.user)
  return (
    <div> {user.username} </div>
  )
}

export default About