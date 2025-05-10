const express = require('express');
const helmet = require('helmet');

const app = express();

// Middleware
app.use(helmet.hidePoweredBy()); // Security: Remove X-Powered-By
app.use(express.static('public')); // Serve static files
app.disable('strict-transport-security'); // Disable HSTS if required

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Export app for server.js
module.exports = app;
