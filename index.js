// index.js
const express = require('express');
const { connectDB } = require('./config');
const path = require('path');
const cookieParser = require('cookie-parser');

const { urlRouter } = require('./routes/url');
const { staticRouter } = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const { restrictToLoginUserOnly, checkAuth } = require('./middlewares/auth')

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// Register routes
app.use("/url", restrictToLoginUserOnly, urlRouter);
app.use('/user', userRoute);
app.use("/", checkAuth, staticRouter);

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



// Start server
app.listen(8000, () => console.log('Server started on port 8000'));
