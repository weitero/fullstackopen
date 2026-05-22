const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const user = await request.user
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    user: user._id,
  })

  const res = await blog.save()

  if (blog.title === undefined || blog.url === undefined) {
    response.status(400).end()
  } else {
    user.blogs = user.blogs.concat(res._id)
    await user.save()
    response.status(201).json(res)
  }
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = await request.user
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }

  if (blog.user.toString() === user.id.toString()) {
    const res = await blog.deleteOne()
    response.status(204).json(res)
  } else {
    response.status(403).json({ error: 'no permission' })
  }
})

blogRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  blog.likes = request.body.likes

  const res = await blog.save()
  response.status(201).json(res)
})

module.exports = blogRouter
