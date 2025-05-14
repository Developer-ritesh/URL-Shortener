// index.js
const express = require('express');
const { urlRouter } = require('./routes/url');
const { connectDB } = require('./config');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB("mongodb://localhost:27017/urlshortener")
    .then(() => console.log('Mongo connected'))
    .catch((err) => {
        console.error('Mongo connection failed:', err);
        process.exit(1);
    });

// Register routes
app.use("/url", urlRouter);

// Start server
app.listen(8000, () => console.log('Server started on port 8000'));
