const express = require('express');
const helmet = require('helmet');

const app = express();

// Security middleware
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' })); // ✅ This mitigates clickjacking

// You can add other middleware or routes below if needed
// For example:
// app.get('/', (req, res) => res.send('Hello World'));

module.exports = app; // ✅ Required for server.js to use this app
