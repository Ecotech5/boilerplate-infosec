const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet({
  frameguard: {
    action: 'deny'
  },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'trusted-cdn.com']
    }
  },
  dnsPrefetchControl: false
}));

// You may still add specific ones not covered by default:
app.use(helmet.noCache());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());

const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({
  maxAge: ninetyDaysInSeconds,
  force: true
}));

// other code...
module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
