const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
     if (!('likes' in request.body)) {
	blog.likes = 0
    }
    if (!('title' in request.body) || !('url' in request.body)) {
	response.status(400).end()
	return
    }
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)

})

module.exports = blogRouter
