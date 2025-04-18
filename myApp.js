const express = require('express');
const helmet = require('helmet');
const app = express();

// Middleware
app.use(helmet.hidePoweredBy()); // 🔒 explicitly removes X-Powered-By
app.use(helmet());               // other helmet protections
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from myApp!');
});

app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'Hello API!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;
