const express = require('express');
const createError = require('http-errors');
const path = require('path');



const userRouter = require('./routers/User.router.js');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route Registrations

app.use('/users', userRouter);


// 404 Error Handler
app.use((req, res, next) => {
  next(createError(404, `Unknown resource ${req.method} ${req.originalUrl}`));
});

// Global Error Handler
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({ error: error.message || 'Unknown Server Error!' });
});

module.exports = app;
