const mongoose = require('mongoose')

// Define the custom validator for the phone number
function phoneNumberValidator(value) {
  // Matches phone numbers like 09-1234556 or 040-22334455
  const regex = /^[0-9]{2,3}-[0-9]{6,8}$/
  return regex.test(value)
}

// Create a schema for Person
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name needs to be more than 3 characters long']
  },
  number: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: phoneNumberValidator,
      message: 'Number formatting is not correct. It should be in the format: xx-xxxxxxx or xxx-xxxxxxx'
    },
    minlength: [8, 'Phone number should have at least 8 characters']
  }
})

// Export the Person model based on the personSchema
module.exports = mongoose.model('Person', personSchema)
