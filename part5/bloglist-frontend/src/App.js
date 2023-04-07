import React from 'react'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const handleLogin = async (event) => {
    console.log('handleLogin()')
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    console.log('addBlog')
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    }
    console.log(blogObject)
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({
          title: '',
          author: '',
          url: '',
        })
      })
  }

  const handleBlogChange = (event) => {
    setNewBlog({
      ...newBlog,
      [event.target.name]: event.target.value
    })
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

  const blogForm = () => (
    <form onSubmit={addBlog}>
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
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h1>Blogs app</h1>
        {loginForm()}
      </div>
    )
  } else {
    return (
      <div>
        <h1>Blogs app</h1>
        <Notification message={errorMessage} />
        {user && <div>
          <p>{user.username} logged in</p>
          {blogForm()}
        </div>
        }


        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }


}

export default App
