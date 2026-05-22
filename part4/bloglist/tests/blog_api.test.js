const assert = require('node:assert')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
let token = ''

const api = supertest(app)

const initialBlogs = [
  { title: 'Negative No More', author: 'Akio', url: 'http://nnm.com', likes: '2048' },
  { title: 'A Tale of Two Cities', author: 'Josée', url: 'http://atotc.com', likes: '2048' },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'testblog', passwordHash })
  const savedUser = await user.save()

  const userForToken = { username: user.username, id: user._id }
  token = jwt.sign(userForToken, process.env.SECRET)

  let blogObject = new Blog({ ...initialBlogs[0], user: savedUser._id })
  await blogObject.save()
  blogObject = new Blog({ ...initialBlogs[1], user: savedUser._id })
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique identifier property of the blog posts is named id', async () => {
  const blogs = await api.get('/api/blogs')
  assert.equal(blogs._body[0].hasOwnProperty('id'), true)
  assert.equal(blogs._body[1].hasOwnProperty('id'), true)
  assert.equal(blogs._body[0].hasOwnProperty('_id'), false)
  assert.equal(blogs._body[1].hasOwnProperty('_id'), false)
})

test('a valid blog can be added', async () => {
  const newBlog = { title: 'TITLE', author: 'AUTHOR', url: 'URL', likes: '0' }
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const titles = response.body.map((r) => r.title)
  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  assert(titles.includes('TITLE'))
})

test('likes will default to the value 0', async () => {
  const newBlog = { title: 'TITLE', author: 'AUTHOR', url: 'URL' }
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const res = response.body.find((r) => r.title === 'TITLE')
  assert.strictEqual(res.likes, '0')
})

test('missing title causes 400 Bad Request', async () => {
  const newBlog = { author: 'AUTHOR', url: 'URL' }
  await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400)
})

test('missing url causes 400 Bad Request', async () => {
  const newBlog = { title: 'TITLE', author: 'AUTHOR' }
  await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await Blog.find({})
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogAtEnd = await Blog.find({})

  const ids = blogAtEnd.map((b) => b.id)
  assert(!ids.includes(blogToDelete.id))

  assert.strictEqual(blogAtEnd.length, initialBlogs.length - 1)
})

test('likes of a blog can be updated', async () => {
  const newBlog = { likes: '99' }
  const blogsAtStart = await Blog.find({})
  const blogToUpdate = blogsAtStart[0]

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(201)

  const blogUpdated = await Blog.findById(blogToUpdate.id)

  assert.strictEqual(blogUpdated.likes, newBlog.likes)
})

after(async () => {
  await mongoose.connection.close()
})
