import React from 'react'
import { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { like } from '../reducers/blogReducer'
import { notificationAddAndRemove } from '../reducers/notificationReducer'

const BlogView = () => {
  const [blog, setBlog] = useState([])
  const [comment, setComment] = useState('')
  const id = useParams().id
  const dispatch = useDispatch()

  const increaseLike = () => {
    dispatch(like(blog))
    const msg = { message: 'Successfully liked a blog!', cla: 'success' }
    dispatch(notificationAddAndRemove(msg, 5))
  }

  useEffect(() => {
    blogService.get(id).then((result) => {
      setBlog(result)
    })
  }, [blog])

  const postComment = async (event) => {
    event.preventDefault()
    const commentObject = { content: comment }
    await blogService.createComment(blog.id, commentObject)
    setComment('')
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
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
      <h3> Comments </h3>
      <form onSubmit={postComment}>
        <div>
          Comment
          <input name="url" onChange={handleCommentChange} id="comment-input" />
        </div>
        <button type="submit">Post comment</button>
      </form>
      <ul>
        {blog.comments &&
          blog.comments.map((comment) => (
            <li key={comment._id}> {comment.content} </li>
          ))}
      </ul>
    </div>
  )
}

export default BlogView
