const jwt = require('./jwt');
const config = require('../config/config');
const models = require('../models');

module.exports = (redirectAuthenticated = true) => {

    return function (req, res, next) {
        const token = req.cookies[config.authCookieName] || '';

        try{
            jwt.verifyToken(token);
        }
        catch(err) {
            if (!redirectAuthenticated) { next(); return; }

            next(err);
        }
    }

};