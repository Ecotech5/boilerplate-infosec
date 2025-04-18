const express = require('express');
const helmet = require('helmet'); // ✅ Add helmet
const app = express();

app.use(helmet.hidePoweredBy()); // ✅ Hide X-Powered-By header

module.exports = app;

const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security'); // Note: This line disables a security header; consider removing it unless needed.

app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
