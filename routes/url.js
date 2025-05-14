// routes/url.js
const express = require('express');
const { handleGenerateNewShortUrl, handleUrlGetId, handleAnalytic } = require('../controllers/url');

const urlRouter = express.Router();

urlRouter.post('/', handleGenerateNewShortUrl);

urlRouter.get('/:shortId', handleUrlGetId)
urlRouter.get('/analytics/:shortId', handleAnalytic)

module.exports = { urlRouter };
