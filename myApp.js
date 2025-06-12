const express = require('express');
const helmet = require('helmet');
const app = express();


  // Use helmet to enhance API's security
app.use(helmet());

// Hide the X-Powered-By header
app.use(helmet.hidePoweredBy());

// Prevent clickjacking by denying framing
app.use(helmet.frameguard({ action: 'deny' }));

// Enable XSS protection
app.use(helmet.xssFilter());

// Prevent MIME type sniffing
app.use(helmet.noSniff());

// Prevent Internet Explorer from executing downloads in your site’s context
app.use(helmet.ieNoOpen());

// Enforce HTTPS usage for the next 90 days
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({
  maxAge: ninetyDaysInSeconds,
  force: true
}));

// Disable DNS prefetching
app.use(helmet.dnsPrefetchControl());


// Disable client-side caching
app.use(helmet.noCache());













































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});