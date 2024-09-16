const express = require('express');
const db = require('./config/db'); 

const app = express();
const routes = require('./routes');

// Middleware to parse incoming requests with JSON
app.use(express.json());

// Define the base route for all API routes
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
