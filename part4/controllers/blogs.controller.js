const blogsRouter = require('express').Router();
const Blog = require('../models/blog.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Get all blogs with populated user details
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    response.json(blogs.map(blog => blog.toJSON()));
});

// Add a new blog
blogsRouter.post('/', async (request, response, next) => {
    const { title, author, url, likes } = request.body;

  // Check for required fields
    if (!title && !url) {
    return response.status(400).end();
    }

    try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);
    const blog = new Blog({
        title,
        author,
        url,
        likes,
        user: user._id
    });

    const savedBlog = await blog.save();
    response.status(201).json(savedBlog.toJSON());
    } catch (error) {
    next(error);
    }
});

// Update a blog
blogsRouter.put('/:id', async (request, response, next) => {
    const { title, author, url, likes, user } = request.body;

    try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {
        title,
        author,
        url,
        likes,
        user
    }, { new: true });

    response.status(201).json(updatedBlog.toJSON());
    } catch (error) {
    next(error);
    }
});

// Delete a blog
blogsRouter.delete('/:id', async (request, response, next) => {
    try {
    const blog = await Blog.findById(request.params.id);
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' });
    }

    if (blog.user.toString() === decodedToken.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
    } else {
        return response.status(401).json({ error: 'a blog can only be deleted by the user who added the blog' });
    }
    } catch (error) {
    response.status(400).end();
    next(error);
    }
});

module.exports = blogsRouter;
