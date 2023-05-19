var _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}
  var favorite = blogs[0]
  for (const blog of blogs) {
    if (blog.likes > favorite.likes) {
      favorite = blog
    }
  }
  return favorite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}
  var mostBlogs = _.chain(blogs)
    .groupBy("author")
    .map((value, key) => ({ author: key, blogs: value.length }))
    .maxBy('blogs')
    .value()
  return mostBlogs
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}
  var mostLikes = _.chain(blogs)
    .groupBy("author")
    .map((value, key) => ({ author: key, likes:  _.sumBy(value, 'likes')}))
    .maxBy('likes')
    .value()
  return mostLikes
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
