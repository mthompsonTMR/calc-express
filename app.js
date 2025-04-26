const express = require('express');
const app = express();

// Import the calculator routes
const calculatorRoutes = require('./routes/calculatorRoutes');

// Middleware to parse incoming JSON
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  return res.send('Welcome to the Calculator API!');
});

// Mount calculator routes
app.use('/', calculatorRoutes);

// 404 Handler - for unmatched routes
app.use(function (req, res, next) {
  const notFoundError = new Error("Not Found");
  notFoundError.status = 404;
  next(notFoundError);
});

// Generic Error Handler - nicely formats errors
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status }
  });
});

// Start server
app.listen(3000, function () {
  console.log('Server running on port 3000');
});
