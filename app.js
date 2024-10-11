require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// Middleware to pass .env variables to all views
app.use((req, res, next) => {
  res.locals.REDIRECT_URI = process.env.REDIRECT_URI;
  res.locals.PING_ONE_ENV_ID = process.env.PING_ONE_ENV_ID;
  res.locals.CLIENT_ID = process.env.CLIENT_ID;
  res.locals.PING_ONE_DOMAIN = process.env.PING_ONE_DOMAIN;
  res.locals.AUTHORIZE_ENDPOINT = process.env.AUTHORIZE_ENDPOINT;
  res.locals.WORKER_CLIENT_ID = process.env.WORKER_CLIENT_ID;
  res.locals.WORKER_CLIENT_SECRET = process.env.WORKER_CLIENT_SECRET;
  res.locals.LOGOUT_URL = process.env.LOGOUT_URL;
  next();
});

// Render the index page (login)
app.get('/', (req, res) => {
  res.render('index');
});

// Render the dashboard page after successful login
app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
