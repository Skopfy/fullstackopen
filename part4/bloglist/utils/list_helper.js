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
    for (const blog of blogs){
	if (blog.likes > favorite.likes){
	    favorite = blog
	}
    }
  return favorite
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
    
}
