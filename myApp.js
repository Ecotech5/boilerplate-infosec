const express = require('express');
const helmet = require('helmet');
const app = express();

// ✅ Helmet security middlewares
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' })); // ✅ Solves the clickjacking challenge

// ✅ Public folder
app.use(express.static('public'));

// ✅ Disable HTTP strict transport security
app.disable('strict-transport-security');

// ✅ API route
const api = require('./server.js');
app.use('/_api', api);

// ✅ Root route
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// ✅ Port listen
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});

module.exports = app;
