const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user.model');

// Get all users with populated blog details
usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
    response.json(users.map(user => user.toJSON()));
});

// Register a new user
usersRouter.post('/', async (request, response, next) => {
    const { username, name, password, blogs } = request.body;

    if (!password || password.length < 3) {
    return response.status(400).send('Password length is shorter than 3').end();
    }

    try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        username,
        name,
        passwordHash,
        blogs,
    });

    const savedUser = await newUser.save();
    response.status(201).json(savedUser.toJSON());

    } catch (error) {
    next(error);
    }
});

module.exports = usersRouter;
