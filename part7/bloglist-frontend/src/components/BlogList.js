import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const blogFormRef = useRef()

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <h2>Blogs</h2>
      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
