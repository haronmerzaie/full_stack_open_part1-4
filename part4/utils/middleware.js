// Log the request details to the console
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:', request.path);
    console.log('Body:', request.body);
    console.log('---');
    next();
}

// Extracts token from the request header
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7);
    }
    next();
}

// Handles unknown endpoints
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
}

// Handles various errors and sends appropriate responses
const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: 'invalid token' });
    }

    next(error);
}

module.exports = {
    requestLogger,
    tokenExtractor,
    unknownEndpoint,
    errorHandler
};
