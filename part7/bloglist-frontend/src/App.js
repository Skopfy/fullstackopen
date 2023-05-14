import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { notificationAddAndRemove } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then((initialBlogs) => {
        setBlogs(initialBlogs)
      })
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      const msg = { message: 'Successfully logged in (Redux).', cla: 'success' }
      dispatch(notificationAddAndRemove(msg, 5))
    } catch (exception) {
      const msg = { message: 'Wrong credentials (Redux).', cla: 'error' }
      dispatch(notificationAddAndRemove(msg, 5))
    }
  }
  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    const msg = { message: 'Successfully logged out (Redux).', cla: 'success' }
    dispatch(notificationAddAndRemove(msg, 5))
  }

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        returnedBlog.user = user
        setBlogs(blogs.concat(returnedBlog))
        blogFormRef.current.toggleVisibility()
      })
      .catch((error) => {
        const msg = {
          message: `Successfully logged out (Redux).  Error: ${error}`,
          cla: 'error'
        }
        dispatch(notificationAddAndRemove(msg, 5))
      })
  }

  const updateBlog = (blogObject) => {
    blogService
      .update(blogObject.id, blogObject)
      .then(() => {
        const msg = {
          message: 'Successfully updated a blog (Redux).',
          cla: 'success'
        }
        dispatch(notificationAddAndRemove(msg, 5))
      })
      .catch((error) => {
        const msg = {
          message: `Could not update a blog (Redux).  Error: ${error}`,
          cla: 'error'
        }
        dispatch(notificationAddAndRemove(msg, 5))
      })
  }

  const deleteBlog = (blogObject) => {
    if (window.confirm('Do you really want to delete this blogpost?')) {
      blogService
        .remove(blogObject.id)
        .then(() => {
          const idx = blogs.indexOf(blogObject)
          if (idx !== -1) {
            blogs.splice(idx, 1)
          }
          const msg = {
            message: 'Successfully deleted a blog (Redux).',
            cla: 'success'
          }
          dispatch(notificationAddAndRemove(msg, 5))
        })
        .catch((error) => {
          const msg = {
            message: `Could not delete a blog (Redux).  Error: ${error}`,
            cla: 'error'
          }
          dispatch(notificationAddAndRemove(msg, 5))
        })
    }
  }

  function compareBlogsByLikes(blogA, blogB) {
    if (blogA.likes > blogB.likes) {
      return -1
    }
    if (blogA.likes < blogB.likes) {
      return 1
    }
    return 0
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h1>Blogs app</h1>
        <Notification />
        {loginForm()}
      </div>
    )
  } else {
    return (
      <div>
        <h1>Blogs app</h1>
        <Notification />
        {user && (
          <div>
            <p>
              {user.username} logged in{' '}
              <button id="logout-button" onClick={handleLogout}>
                logout
              </button>{' '}
            </p>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm createBlog={addBlog} />
            </Togglable>
          </div>
        )}

        <h2>blogs</h2>
        {blogs.sort(compareBlogsByLikes).map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />
        ))}
      </div>
    )
  }
}

export default App
