// Define a function to log informational messages to the console
// Doesn't log when the NODE_ENV is set to 'test'
const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(...params)
    }
  };
  
  // Define a function to log error messages to the console
  // Doesn't log when the NODE_ENV is set to 'test'
  const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
      console.error(...params)
    }
  };
  
  // Export the info and error functions
  module.exports = {
    info, error
  };
  