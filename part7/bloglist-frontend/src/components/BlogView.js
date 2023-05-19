import React from 'react'
import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { like } from '../reducers/blogReducer'
import { notificationAddAndRemove } from '../reducers/notificationReducer'

const BlogView = () => {
  const [blog, setBlog] = useState([])
  const id = useParams().id
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.get(id).then((result) => {
      setBlog(result)
    })
  }, [])

  const increaseLike = () => {
    dispatch(like(blog))
    const msg = { message: 'Successfully liked a blog!', cla: 'success' }
    dispatch(notificationAddAndRemove(msg, 5))
  }

  return (
    <div>
      <h2>
        {' '}
        {blog.title} by: {blog.author}
      </h2>
      <p> {blog.url} </p>
      <div>
        {' '}
        likes: {blog.likes}{' '}
        <button id="like-button" onClick={increaseLike}>
          Like
        </button>{' '}
      </div>
      {blog.user && <p> Added by {blog.user.username} </p>}
    </div>
  )
}

export default BlogView
