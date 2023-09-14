const mongoose = require('mongoose');

// Define the schema for a blog
const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    user: {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to the User model
    },
    url: String,
  likes: { type: Number, default: 0 } // Likes default to 0
});

// Custom transformation for the JSON representation of the blog
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); // Convert _id to string and rename to id
    delete returnedObject._id;
    delete returnedObject.__v; // Remove version key (__v)
    }
});

// Create the Blog model using the blog schema
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
