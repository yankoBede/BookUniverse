const models = require('../models');
const config = require('../config/config');
const utils = require('../utils');
const jwt = require('../utils/jwt');

module.exports = {
    get: (req, res, next) => {
        models.User.findById(req.query.id)
            .then((user) => res.send(user))
            .catch((err) => res.status(500).send("Error"))
    },

    post: {
        register: (req, res, next) => {
            const { username, password } = req.body;

            if(password.length < 8) {
                return res.send({
                    error: true,
                    message: "Password must be at least 8 symbols"
                })
            }

            if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)) {
                return res.send({
                    error: true,
                    message: "Password must minimum 8 characters and at least 1 alphabet, 1 mumber and 1 special symbols"
                })
            }

            models.User.create({ username, password })
                .then((createdUser) => {
                    const token = utils.jwt.createToken({ id: createdUser._id });
                    //res.cookie(config.authCookieName, token)
                    res.header(config.authCookieName, token).send(createdUser)
                })
                .catch((err) => {
                    return res.send({
                        error: true,
                        message: err
                    })
                })
        },

        verifyLogin: async (req, res, next) => {
            const token = req.body.token || '';

            try{
                const data = await jwt.verifyToken(token);
                const user = await models.User.findById(data.id)
                
                req.user = user;
                return res.send({
                    status: true,
                    user
                })
            }
            catch(err) {
               return res.send({
                   status: false
               })
            }
        },

        login: (req, res, next) => {
            const { username, password } = req.body;
            models.User.findOne({ username })
                .then((user) => Promise.all([user, user.matchPassword(password)]))
                .then(([user, match]) => {
                    if (!match) {
                        res.status(401).send({
                            error: true,
                            message: "Login is unsuccessful! Please double-check your credentials"
                        });
                        return;
                    }

                    const token = utils.jwt.createToken({ id: user._id });
                    //res.cookie(config.authCookieName, token).send(user);
                    res.header(config.authCookieName, token).send(user);
                })
                .catch((err) => {
                    return res.status(401).send({
                        error: true,
                        message: "Login is unsuccessful! Please double-check your credentials"
                    })
                })
        },

        logout: (req, res, next) => {
            const token = req.cookies[config.authCookieName];
            console.log('-'.repeat(100));
            console.log(token);
            console.log('-'.repeat(100));

            res.clearCookie(config.authCookieName).send('Logout successfully!');

        }
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { username, password } = req.body;
        models.User.update({ _id: id }, { username, password })
            .then((updatedUser) => res.send(updatedUser))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.User.deleteOne({ _id: id })
            .then((removedUser) => res.send(removedUser))
            .catch(next)
    }
};