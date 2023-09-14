const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    // Extracting the first validation error from the errors object
    const errorMessage = Object.values(error.errors)[0].message
    return response.status(400).json({ error: errorMessage })
  }

  next(error)
}

module.exports = errorHandler