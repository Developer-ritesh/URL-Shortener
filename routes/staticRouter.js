const express = require('express');
const { URL } = require('../models/url');
const { restrictTo } = require('../middlewares/auth')


const staticRouter = express.Router();


staticRouter.get('/admin/urls', restrictTo(['ADMIN']), async (req, res) =>{
    // if (!req.user)  return res.redirect('/login');
    const allUrls = await URL.find({ createdBy: req.user._id });
    res.render("home", {
        urls: allUrls
    });
});

staticRouter.get('/', restrictTo(['NORMAL', 'ADMIN']), async (req, res) => {
    // if (!req.user)  return res.redirect('/login');
    const allUrls = await URL.find({ createdBy: req.user._id });
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