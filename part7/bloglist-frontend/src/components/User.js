import React from 'react'
import Blog from './Blog'
import { useEffect, useState } from 'react'
import userService from '../services/users'
import { useParams } from 'react-router-dom'

const User = () => {

  const [user, setUser] = useState({})
  const [blogs, setBlogs] = useState([])
  const id = useParams().id

  useEffect(() => {
    userService.get(id).then((result) => {
      setUser(result)
      setBlogs(result.blogs)
    })
  }, [])

  console.log('asda', user)
  return (
    <div>
      <h2>{user.username}</h2>
      <h3>Added blogs</h3>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default User
