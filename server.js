const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Middleware to handle CORS and disable x-powered-by
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, content-type, Accept",
  });
  app.disable("x-powered-by");
  next();
});

// File route to allow test access (except .env)
app.get('/file/*?', (req, res, next) => {
  if (req.params[0] === '.env') {
    return next({ status: 401, message: 'ACCESS DENIED' });
  }
  fs.readFile(path.join(__dirname, req.params[0]), (err, data) => {
    if (err) return next(err);
    res.type('txt').send(data.toString());
  });
});

// Mount your application from myApp.js
const mainApp = require('./myApp.js');
app.use('/', mainApp);

// Route to inspect middleware and headers
app.get('/app-info', (req, res) => {
  if (mainApp._router) {
    const appMainRouteStack = mainApp._router.stack
      .filter((s) => s.name && s.name !== 'query' && s.name !== 'expressInit' && s.name !== 'serveStatic')
      .map((s) => s.name);

    const hs = Object.keys(res.getHeaders()).filter(h => !/^access-control-\w+/.test(h));
    const hObj = {};
    hs.forEach(h => hObj[h] = res.getHeaders()[h]);

    delete res.get("strict-transport-security");
    res.json({ headers: hObj, appStack: appMainRouteStack });
  } else {
    res.status(500).send('Main app routes are not initialized correctly.');
  }
});

// Serve package.json
app.get('/package.json', (req, res, next) => {
  fs.readFile(__dirname + '/package.json', (err, data) => {
    if (err) return next(err);
    res.type('txt').send(data.toString());
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).type('txt').send('Not Found');
});

// Bind port only if not in testing
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });
}

module.exports = app;
