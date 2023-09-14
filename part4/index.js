// Import necessary modules
const app = require('./app');
const http = require('http');
const config = require('./utils/config');

// Create a server instance
const server = http.createServer(app);

// Start the server on the defined port
server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});
