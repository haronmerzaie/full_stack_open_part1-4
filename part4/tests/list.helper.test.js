const listHelper = require('../utils/list.helper')
const _ = require('lodash')

const listWithZeroBlogs = [{}];

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f1',
    title: 'Sample Blog 1',
    author: 'Author A',
    url: 'http://sampleblog1.com',
    likes: 10,
    __v: 0,
  },
];

const listWithManyBlogs = [
  {
    _id: '5a422aa71b54a676234d17f2',
    title: 'Sample Blog 2',
    author: 'Author B',
    url: 'http://sampleblog2.com',
    likes: 20,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f3',
    title: 'Sample Blog 3',
    author: 'Author A',
    url: 'http://sampleblog3.com',
    likes: 15,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f4',
    title: 'Sample Blog 4',
    author: 'Author B',
    url: 'http://sampleblog4.com',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f5',
    title: 'Sample Blog 5',
    author: 'Author A',
    url: 'http://sampleblog5.com',
    likes: 8,
    __v: 0,
  },
];

// Testing the dummy function
test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

// Testing the totalLikes function
describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithZeroBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(10) //
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(55) 
  })
})

// Testing the favoriteBlog function
describe('which blog has most likes', () => {

  test('of empty list with zero blogs', () => {
    const result = listHelper.favoriteBlog(listWithZeroBlogs)
    const expected = {}
    expect(result).toEqual(expected)
  })

  test('of many blogs', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    const expected =
    {
      title: 'Sample Blog 2', 
      author: 'Author B', 
      likes: 20 
    }
    expect(result).toEqual(expected)
  })

  test('of many blogs with more than one blog that has the max value', () => {
    const listWithManyBlogsCopy = _.cloneDeep(listWithManyBlogs)
    listWithManyBlogsCopy[1].likes = 12

    const result = listHelper.favoriteBlog(listWithManyBlogsCopy)
    const expected =
    {
      title: 'Sample Blog 2', 
      author: 'Author B', 
      likes: 20 
    }
    expect(result).toEqual(expected)
  })
})

// Testing the mostBlogs function
test('author with most blogs', () => {
  const result = listHelper.mostBlogs(listWithManyBlogs)
  const expected = { author: 'Author A', blogs: 2 } 
  expect(result).toEqual(expected)
})

// Testing the mostLikes function
test('author with most likes', () => {
  const result = listHelper.mostLikes(listWithManyBlogs)
  const expected = { author: 'Author B', likes: 32 } 
  expect(result).toEqual(expected)
})
