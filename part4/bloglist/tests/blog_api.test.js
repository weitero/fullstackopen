const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  { title: 'Negative No More', author: 'Akio', url: 'http://nnm.com', likes: '2048' },
  { title: 'A Tale of Two Cities', author: 'Josée', url: 'http://atotc.com', likes: '2048' },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('unique identifier property of the blog posts is named id', async () => {
  const blogs = await api.get('/api/blogs')
  assert.equal(blogs._body[0].hasOwnProperty('id'), true)
  assert.equal(blogs._body[1].hasOwnProperty('id'), true)
  assert.equal(blogs._body[0].hasOwnProperty('_id'), false)
  assert.equal(blogs._body[1].hasOwnProperty('_id'), false)
})

test.only('a valid blog can be added', async () => {
  const newBlog = { title: 'TITLE', author: 'AUTHOR', url: 'URL', likes: '0' }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const titles = response.body.map((r) => r.title)
  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  assert(titles.includes('TITLE'))
})

after(async () => {
  await mongoose.connection.close()
})
