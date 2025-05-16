// const sessionIdToUserMap = new Map();

const jwt = require('jsonwebtoken');
const SECRET_KEY = "sdjfhsie ksj";

function setUser(user) {
    // sessionIdToUserMap.set(id, user);
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, SECRET_KEY, { expiresIn: '1h' });
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, SECRET_KEY);
    }catch(err){
        return null;
    }
    
}

module.exports = {
    setUser,
    getUser,
}