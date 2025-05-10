const express = require('express');
const app = express();

// ✅ Use Helmet middleware to secure the app (optional, but good practice)
const helmet = require('helmet');
app.use(helmet.hidePoweredBy());

// Middleware to handle requests to /hello
app.get('/hello', function (req, res) {
  res.send('Hello, World!');
});

// Other app routes can go here
app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

// This will handle any dynamic routes or other APIs you define here

module.exports = app;
