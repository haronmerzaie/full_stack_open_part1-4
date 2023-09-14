// Import necessary modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const middleware = require('./utils/middleware');

// Import routers
const usersRouter = require('./controllers/users.controller');
const blogsRouter = require('./controllers/blogs.controller');
const loginRouter = require('./controllers/login.controller');

// Initialize the express app
const app = express();

// Connect to MongoDB
console.log('Connecting to', config.MONGODB_URI);
mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
});

// Apply middlewares
app.use(cors()); // Enable cross-origin resource sharing
app.use(express.static('build')); // Serve static files from the 'build' directory
app.use(express.json()); // Parse incoming JSON payloads
app.use(middleware.requestLogger); // Log all incoming requests
app.use(middleware.tokenExtractor); // Extract token from incoming requests

// Define routes
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);

// Handle unknown endpoints and errors
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// Export the app for other modules to use
module.exports = app;
