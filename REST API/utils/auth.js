const jwt = require('./jwt');
const config = require('../config/config');
const models = require('../models');

module.exports = (redirectAuthenticated = true) => {
    return async function (req, res, next) {
        const token = req.headers[config.authCookieName] || '';

        try{
            const data = await jwt.verifyToken(token);
            const user = await models.User.findById(data.id)
            req.user = user;
            next();
        }
        catch(err) {
            next(err);
        }
    }
};