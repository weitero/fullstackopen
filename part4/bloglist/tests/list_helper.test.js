const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const res = listHelper.dummy(blogs)
  assert.strictEqual(res, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '69e8284d9997c8af146b60d0',
      title: 'Santa Claus',
      author: 'Akio',
      url: 'http://example.com/blog',
      likes: 77,
      __v: 0,
    },
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const res = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(res, 77)
  })
})
