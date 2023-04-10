import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))

  const rightUser = () => {
    return blog.user.username === loggedUser.username
  }

  const showWhenRightUser = { display: rightUser() ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLike = () => {
    blog.likes = blog.likes + 1
    updateBlog(blog)
  }

  const removeBlog = () => {
    deleteBlog(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    < div style={blogStyle} className='blog'>
      {blog.title} {blog.author} <button onClick={toggleVisibility} style={showWhenVisible}>Hide</button>
      <button onClick={toggleVisibility} style={hideWhenVisible}>Show</button>
      <div style={showWhenVisible} className='blog_hidden'>
        <div>
          {blog.url}
          <div> likes: {blog.likes} <button onClick={increaseLike}>Like</button> </div>
          {blog.user.username}
        </div>
        <div style={showWhenRightUser}>  <button onClick={removeBlog}>Delete</button> </div>
      </div>
    </div >
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog