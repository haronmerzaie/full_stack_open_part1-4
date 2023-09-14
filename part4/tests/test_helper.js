const Blog = require('../models/blog.model')
const User = require('../models/user.model')

const initialBlogs = [
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

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = { initialBlogs, nonExistingId, blogsInDb, usersInDb }