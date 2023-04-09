import React from 'react'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0,
    user: null
  })

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    }
    createBlog(blogObject)
    setNewBlog({
      title: '',
      author: '',
      url: '',
      likes: 0,
      user: null
    })
  }

  const handleBlogChange = (event) => {
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value
    })
  }


  return (< form onSubmit={addBlog} >
    <div>
      title
      <input
        value={newBlog.title}
        name="title"
        onChange={handleBlogChange}
      />
    </div>
    <div>
      author
      <input
        value={newBlog.author}
        name="author"
        onChange={handleBlogChange}
      />
    </div>
    <div>
      url
      <input
        value={newBlog.url}
        name="url"
        onChange={handleBlogChange}
      />
    </div>
    <button type="submit">save</button>
  </form >
  )
}

export default BlogForm