import React from 'react'
import { useSelector } from 'react-redux'
import userService from '../services/users'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  const user = useSelector((state) => state.user)
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (user) {
      userService.getAll().then((result) => {
        setUsers(result)
      })
    }
  }, [])

  return (
    <div>
      <h2>Users | Blogs created</h2>
      {users.map((usr) => (
        <p key={usr.id}>
          {' '}
          <Link to={`/users/${usr.id}`}>{usr.username}</Link> {usr.blogs.length}
        </p>
      ))}
    </div>
  )
}

export default About
