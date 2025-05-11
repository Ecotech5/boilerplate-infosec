const express = require('express');
const helmet = require('helmet');
const app = express();

// Apply helmet and frameguard middleware properly
app.use(helmet()); // Apply all default Helmet protections
app.use(helmet.frameguard({ action: 'deny' })); // Override or ensure frameguard is set to 'deny'

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

module.exports = app;
