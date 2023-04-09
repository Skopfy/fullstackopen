import React from 'react'
import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLike = () => {
    blog.likes = blog.likes + 1
    updateBlog(blog)
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    < div style={blogStyle} >
      {blog.title} {blog.author} <button onClick={toggleVisibility} style={showWhenVisible}>Hide</button>
      <button onClick={toggleVisibility} style={hideWhenVisible}>Show</button>
      <div style={showWhenVisible}>
        {blog.url}
        <div> likes: {blog.likes} <button onClick={increaseLike}>Like</button> </div>
        {blog.user.username}
      </div>
    </div >
  )
}


export default Blog