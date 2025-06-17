const { User } = require('../models/user');
const { v4: uuid } = require('uuid');
const { setUser } = require('../service/auth')

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    const result = await User.create({
        name,
        email,
        password,
    });
    return res.redirect('/');
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const result = await User.findOne({
        email,
        password,
    });
    if (!result) {
        return res.render('login', {
            error: 'Invalid email or password',
        });
    }
    // const sessionId = uuid();
    const token = setUser(result);
    // res.cookie('uid', token);
    res.cookie('token', token);
    // res.json({token});
    return res.redirect('/');
}


module.exports = { handleUserSignup, handleUserLogin };