import React from 'react'
import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { notificationAddAndRemove } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { logout } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      //const userParsed = JSON.parse(loggedUserJSON)
      //dispatch(loginUser(user))
      dispatch(initializeBlogs())
    }
  }, [dispatch, user])

  const handleLogout = async () => {
    dispatch(logout())
    const msg = { message: 'Successfully logged out (Redux).', cla: 'success' }
    dispatch(notificationAddAndRemove(msg, 5))
  }

  if (!user) {
    return (
      <div>
        <h1>Blogs app</h1>
        <Notification />
        <LoginForm />
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
              <BlogForm />
            </Togglable>
          </div>
        )}

        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    )
  }
}

export default App
