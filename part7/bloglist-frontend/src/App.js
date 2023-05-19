import React from 'react'
import { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import About from './components/About'
import User from './components/User'
import Logout from './components/Logout'
import BlogList from './components/BlogList'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'

const padding = {
  paddingRight: 5
}

const App = () => {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs())
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
        <div>
          <h1>Blogs app</h1>
          <Link style={padding} to="/">
            Main
          </Link>
          <Link style={padding} to="/users">
            User info
          </Link>
          <Notification />
          {user && (
            <div>
              <Logout />
            </div>
          )}
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/users" element={<About />} />
            <Route path="/users/:id" element={<User/>} />
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App
