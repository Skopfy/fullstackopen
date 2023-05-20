import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { notificationAddAndRemove } from '../reducers/notificationReducer'
import { like, deleteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.user)
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const rightUser = () => {
    if (loggedUser && blog.user) {
      return blog.user.username === loggedUser.username
    } else {
      return false
    }
  }

  const showWhenRightUser = { display: rightUser() ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLike = () => {
    dispatch(like(blog))
    const msg = { message: 'Successfully liked a blog!', cla: 'success' }
    dispatch(notificationAddAndRemove(msg, 5))
  }

  const removeBlog = () => {
    dispatch(deleteBlog(blog))
    const msg = { message: 'Successfully removed a blog!', cla: 'success' }
    dispatch(notificationAddAndRemove(msg, 5))
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <tr style={blogStyle} className="blog">
      <td>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}{' '}
        </Link>
        <Button onClick={toggleVisibility} style={showWhenVisible}>
          Hide
        </Button>
        <Button
          id="show-button"
          onClick={toggleVisibility}
          style={hideWhenVisible}
        >
          Show
        </Button>
      </td>
      <div style={showWhenVisible} className="blog_hidden">
        <div>
          <td> {blog.url} </td>
          <div>
            {' '}
            likes: {blog.likes}{' '}
            <Button id="like-button" onClick={increaseLike}>
              Like
            </Button>{' '}
          </div>
          {blog.user && <div> {blog.user.username} </div>}
        </div>
        <div style={showWhenRightUser}>
          {' '}
          <Button id="delete-button" onClick={removeBlog}>
            Delete
          </Button>{' '}
        </div>
      </div>
    </tr>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
