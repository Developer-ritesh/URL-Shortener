const express = require('express');
const { handleUserSignup, handleUserLogin } = require('../controllers/user');

const userRoute = express.Router();

userRoute.post('/', handleUserSignup);
userRoute.post('/login', handleUserLogin);

module.exports = userRoute;
