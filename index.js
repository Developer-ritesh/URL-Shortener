// index.js
const express = require('express');
const { urlRouter } = require('./routes/url');
const { connectDB } = require('./config');
const path = require('path');
const { staticRouter } = require('./routes/staticRouter');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/// view engien set
app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));


// Connect to MongoDB
connectDB("mongodb://localhost:27017/urlshortener")
    .then(() => console.log('Mongo connected'))
    .catch((err) => {
        console.error('Mongo connection failed:', err);
        process.exit(1);
    });

// Register routes
app.use("/url", urlRouter);
app.use("/", staticRouter);

// Start server
app.listen(8000, () => console.log('Server started on port 8000'));
