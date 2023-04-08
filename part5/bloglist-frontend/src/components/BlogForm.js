import React from 'react'

const BlogForm = ({ addBlog, handleBlogChange, newBlog }) => (
  < form onSubmit = { addBlog } >
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
  </form >
)

export default BlogForm