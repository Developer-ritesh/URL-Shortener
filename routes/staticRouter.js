const express = require('express');
const { URL } = require('../models/url');


const staticRouter = express.Router();

staticRouter.get('/', async (req, res) => {
    if (!req.user)  return res.redirect('/login');
    const allUrls = await URL.find({createdBy: req.user._id});
    res.render("home", {
        allUrls
    });
});

staticRouter.get('/signup', (req, res) =>
    res.render('signup')
);

staticRouter.get('/login', (req, res) =>
    res.render('login')
);

module.exports = {
    staticRouter,
}