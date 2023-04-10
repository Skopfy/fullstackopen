import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.
      getAll().
      then(initialBlogs => {
        setBlogs(initialBlogs)
      }
      )
  }, [])




  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage('Successfully logged in.')
      setTimeout(() => { setSuccessMessage(null) }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setSuccessMessage('Successfully logged out.')
    setTimeout(() => { setSuccessMessage(null) }, 5000)
  }


  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        returnedBlog.user = user
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage('Successfully added a blog.')
        setTimeout(() => { setSuccessMessage(null) }, 5000)
        blogFormRef.current.toggleVisibility()
      })
      .catch(error => {
        setErrorMessage(`Could not add a blog. Error: ${error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const updateBlog = (blogObject) => {
    blogService
      .update(blogObject.id, blogObject)
      .then(() => {
        setSuccessMessage('Successfully updated a blog.')
        setTimeout(() => { setSuccessMessage(null) }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Could not update a blog. Error: ${error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
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
          setSuccessMessage('Successfully deleted a blog.')
          setTimeout(() => { setSuccessMessage(null) }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Could not delete the blog. Error: ${error}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
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
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h1>Blogs app</h1>
        <Notification message={errorMessage} cla={'error'} />
        <Notification message={successMessage} cla={'success'} />
        {loginForm()}
      </div>
    )
  } else {
    return (
      <div>
        <h1>Blogs app</h1>
        <Notification message={errorMessage} cla={'error'} />
        <Notification message={successMessage} cla={'success'} />
        {user && <div>
          <p>{user.username} logged in <button onClick={handleLogout}>logout</button> </p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>
        </div>
        }


        <h2>blogs</h2>
        {blogs.sort(compareBlogsByLikes).map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
        )}
      </div>
    )
  }


}

export default App
