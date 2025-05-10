const express = require('express');
const helmet = require('helmet');  // Import helmet

const app = express();

// ✅ Use helmet middleware correctly
app.use(helmet.hidePoweredBy());

// Define other routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/app-info', (req, res) => {
  res.json({ message: 'App Info endpoint' });
});

// Set the port to 10000 as detected by Render
const port = process.env.PORT || 10000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
