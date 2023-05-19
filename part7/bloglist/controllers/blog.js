const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {"blogs": 0})
    response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('user', {"blogs": 0})
    response.json(blog)
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
    
    const user = request.user
    blog.user = user.id
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogRouter.post('/:id/comments', async (request, response) => {
    const comment = new Comment(request.body)
    const blogId = request.params.id
    const blog = await Blog.findById(blogId)
    blog.comments = blog.comments.concat(comment)
    await blog.save()
    response.status(201).json(blog)
})

blogRouter.delete('/:id', async (request, response) => {
    const user = request.user
    const blogId = request.params.id
    const blog = await Blog.findById(blogId)
    if ( blog.user.toString() === user.id.toString() ) {
	await Blog.findByIdAndRemove(blogId)
	response.status(204).end()
    } else {
	response.status(403).end()
    }
    
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
    likes: body.likes,
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogRouter
