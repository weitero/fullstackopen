const _ = require('lodash')

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
  const reducer = (prev, current) => {
    return prev.likes > current.likes ? prev : current
  }
  return blogs.length !== 0 ? blogs.reduce(reducer) : null
}

const mostBlogs = (blogs) => {
  // const reducer = (counts, item) => {
  //   if (counts[item.author]) {
  //     counts[item.author] += 1
  //   } else {
  //     counts[item.author] = 1
  //   }
  //   return counts
  // }
  // const counts = blogs.reduce(reducer, {})
  // return Object.keys(counts).reduce((prev, current) => {
  //   const maxKey = counts[prev] > counts[current] ? prev : current
  //   return { author: maxKey, blogs: counts[maxKey] }
  // })
  // Using lodash
  return _.zipObject(
    ['author', 'blogs'],
    _.maxBy(
      _.toPairs(
        _.countBy(blogs, (o) => {
          return o.author
        }),
      ),
      (o) => {
        return o[1]
      },
    ),
  )
}

const mostLikes = (blogs) => {
  return _.zipObject(
    ['author', 'likes'],
    _.maxBy(
      _.toPairs(
        _.mapValues(
          _.groupBy(blogs, (o) => o.author),
          (o) => _.sumBy(o, (o) => o.likes),
        ),
        (o) => o[1],
      ),
      (o) => o[1],
    ),
  )
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
