import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

function compareLikes(a, b) {
  if (a.likes < b.likes) {
    return 1
  }
  if (a.likes > b.likes) {
    return -1
  }
  return 0
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const id = action.payload.id
      const changedBlog = {
        ...action.payload
      }
      return state.map((note) => (note.id !== id ? note : changedBlog))
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const id = action.payload.id
      const newState = state.filter((note) => note.id !== id)
      console.log('state now: ', JSON.parse(JSON.stringify(newState)))
      return newState
    },
    // eslint-disable-next-line no-unused-vars
    sort(state, action) {
      //// console.log('state now: ', JSON.parse(JSON.stringify(state)))
      //console.log('action', action)
      const newState = state.sort(compareLikes)
      return newState
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
    dispatch(sort())
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
    dispatch(sort())
  }
}

export const like = (blog) => {
  return async (dispatch) => {
    const votedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const newBlog = await blogService.update(votedBlog.id, votedBlog)
    dispatch(updateBlog(newBlog))
    dispatch(sort())
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id).then(() => {
      dispatch(removeBlog(blog))
      dispatch(sort())
    })
  }
}

export const { appendBlog, sort, setBlogs, updateBlog, removeBlog } =
  blogSlice.actions
export default blogSlice.reducer
