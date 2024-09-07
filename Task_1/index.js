const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Task routes
app.use(taskRoutes);

// Error handling for routes
app.use((req, res, next) => {
    res.status(404).send('Sorry, can\'t find that!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
