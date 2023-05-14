import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notificationAddAndRemove } from '../reducers/notificationReducer'

const BlogForm = ({ createBlog }) => {
  const dispatch = useDispatch()
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
      url: newBlog.url
    }
    createBlog(blogObject)
    setNewBlog({
      title: '',
      author: '',
      url: '',
      likes: 0,
      user: null
    })
    const msg = 'Successfully added a blog!'
    dispatch(notificationAddAndRemove(msg, 5))
  }

  const handleBlogChange = (event) => {
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value
    })
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          value={newBlog.title}
          name="title"
          onChange={handleBlogChange}
          id="title-input"
        />
      </div>
      <div>
        author
        <input
          value={newBlog.author}
          name="author"
          onChange={handleBlogChange}
          id="author-input"
        />
      </div>
      <div>
        url
        <input
          value={newBlog.url}
          name="url"
          onChange={handleBlogChange}
          id="url-input"
        />
      </div>
      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm
