// routes/url.js
const express = require('express');
const { handleGenerateNewShortUrl, handleUrlGetId, handleAnalytic, handleDeleteShortUrl } = require('../controllers/url');

const urlRouter = express.Router();

urlRouter.post('/', handleGenerateNewShortUrl);

urlRouter.get('/:shortId', handleUrlGetId)
urlRouter.get('/analytics/:shortId', handleAnalytic)
urlRouter.post('/delete-url', handleDeleteShortUrl);


module.exports = { urlRouter };
