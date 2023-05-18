import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
