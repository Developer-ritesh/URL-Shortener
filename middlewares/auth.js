const { getUser } = require('../service/auth');

function checkForAuthentication(req, res, next) {
    // const authorizationHeaderValue = req.headers['Authorization'];
    const authorizationHeaderValue = req.cookies?.token;
    req.user = null;
    // if (!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer')) return next();
    if (!authorizationHeaderValue) return next();

    // const token = authorizationHeaderValue.split("Bearer ")[1];
    const token = authorizationHeaderValue;
    const user = getUser(token);
    req.user = user;
    return next();
}

function restrictTo(roles){
    return function (req, res, next) {
        if(!req.user) return res.redirect('/login');

        if (!roles.includes(req.user.role)) return res.end('UnAuthorized');
        return next();
    }
}

async function restrictToLoginUserOnly(req, res, next) {
    const userUid = req.cookies.uid;
    if (!userUid) {
        return res.redirect('/login');
    }
    const user = getUser(userUid);
    if (!user) {
        return res.redirect('/login');
    }
    req.user = user;
    next();
}

async function checkAuth(req, res, next) {

    // const userId = req.headers['Authorization'];
    // const token = userId.split("Bearer ")[1];
    // const user = getUser(token);

    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoginUserOnly,
    checkAuth,
    checkForAuthentication,
    restrictTo,
}