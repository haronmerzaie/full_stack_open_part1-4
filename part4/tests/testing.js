const testingRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

// Define a route to reset the database for testing purposes
testingRouter.post('/reset', async (request, response) => {
  // Delete all blog and user data from the database
  await Blog.deleteMany({});
  await User.deleteMany({});

  // Send a successful response after deletion
  response.status(204).end();
});

// Export the router for use in other parts of the application
module.exports = testingRouter;
