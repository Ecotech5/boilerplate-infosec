const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Disable 'X-Powered-By' header globally for security
app.disable('x-powered-by');

// Middleware to set custom headers
app.use(function (req, res, next) {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, content-type, Accept',
  });
  next();
});

// Serving files (with security considerations)
app.get('/file/*?', function (req, res, next) {
  if (req.params[0] === '.env') {
    return next({ status: 401, message: 'ACCESS DENIED' });
  }
  fs.readFile(path.join(__dirname, req.params[0]), function (err, data) {
    if (err) {
      return next(err);
    }
    res.type('txt').send(data.toString());
  });
});

// Importing your main app (myApp.js)
const mainApp = require('./myApp.js');
app.use('/', mainApp);

// Serving package.json
app.get('/package.json', function (req, res, next) {
  fs.readFile(__dirname + '/package.json', function (err, data) {
    if (err) return next(err);
    res.type('txt').send(data.toString());
  });
});

// Default 404 handler
app.use(function (req, res, next) {
  res.status(404).type('txt').send('Not Found');
});

module.exports = app;
