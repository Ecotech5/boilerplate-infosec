const express = require('express');
const app = express();

// ✅ Step 1: Require helmet
const helmet = require('helmet');

// ✅ Step 2: Use helmet.hidePoweredBy()
app.use(helmet.hidePoweredBy());

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

module.exports = app;
