const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Define the schema for a user
const userSchema = mongoose.Schema({
  username: { type: String, minlength: 3, unique: true }, // Unique username with min length of 3
    name: String,
  passwordHash: String, // Store hashed passwords, not plain-text
    blogs: [
    {
    type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog' // Reference to the Blog model
    }
    ],
});

// Use the unique-validator plugin to ensure unique fields
userSchema.plugin(uniqueValidator);

// Custom transformation for the JSON representation of the user
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); // Convert _id to string and rename to id
    delete returnedObject._id;
    delete returnedObject.__v; // Remove version key (__v)
    delete returnedObject.passwordHash; // Ensure password hash isn't exposed
}
});

// Create the User model using the user schema
const User = mongoose.model('User', userSchema);

module.exports = User;
