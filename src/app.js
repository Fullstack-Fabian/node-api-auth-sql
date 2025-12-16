const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

// Central error handler
app.use((err, req, res, next) => {
  const status = Number(err.status || 500);
  const message = status >= 500 ? 'Internal server error' : err.message;
  if (status >= 500) console.error(err);
  res.status(status).json({ error: message });
});

module.exports = app;
