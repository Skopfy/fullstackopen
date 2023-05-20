import React from 'react'
import { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import About from './components/About'
import User from './components/User'
import Logout from './components/Logout'
import BlogView from './components/BlogView.js'
import BlogList from './components/BlogList'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import blogService from './services/blogs'
import userService from './services/users'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const padding = {
  paddingRight: 5
}

const App = () => {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs())
    } else {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
      if (loggedUserJSON) {
        const loggedInUser = JSON.parse(loggedUserJSON)
        dispatch(setUser(loggedInUser))
        blogService.setToken(loggedInUser.token)
        userService.setToken(loggedInUser.token)
      }
    }
  }, [dispatch, user])

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
      <Router>
        <div className="container">
          <Link style={padding} to="/">
            Main/Blogs
          </Link>
          <Link style={padding} to="/users">
            Users
          </Link>{' '}
          {user && <Logout />}
          <h1>Blogs app</h1>
          <Notification />
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/blogs/:id" element={<BlogView />} />
            <Route path="/users" element={<About />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App
