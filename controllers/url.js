// controllers/url.js
const { nanoid } = require('nanoid');
const { URL } = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    try {
        console.log('req.body:', req.body); // ✅ debug line

        const { url } = req.body; // this line crashes if req.body is undefined
        if (!url) {
            return res.status(400).json({ message: 'URL is required' });
        }

        const shortId = nanoid(8);
        await URL.create({
            shortId,
            redirectUrl: url,
            visitHostory: [],
        });

        return res.status(201).json({ id: shortId });
    } catch (err) {
        console.error('Error in handleGenerateNewShortUrl:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function handleUrlGetId(req, res) {
    console.log(req.params);
    const shortId = req.params.shortId;
    if (!shortId) return res.status(400).json({ message: 'Short ID is required' });
    const entry = await URL.findOneAndUpdate({ shortId }, {
        $push: {
            visitHostory: {
                timestamp: Date.now(),
            },
        }
    },)
    // res.json(entry);
    res.redirect(entry.redirectUrl); // directly redirect to url
}

async function handleAnalytic(req, res) {
    const shortId = req.params.shortId;

    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHostory.length,
        analytics: result.visitHostory,
    });

}

module.exports = { handleGenerateNewShortUrl, handleUrlGetId, handleAnalytic };
