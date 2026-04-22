const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const res = listHelper.dummy(blogs)
  assert.strictEqual(res, 1)
})
