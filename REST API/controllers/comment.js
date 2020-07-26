const models = require('../models');

module.exports = {
    get: (req, res, next) => {
      const length = req.query.length ? parseInt(req.query.length) : 20
        models.Comment.find().limit(length).populate('creator').populate('book')
            .then((comments) => res.send(comments))
            .catch(next);
    },

    post: (req, res, next) => {
        const { content, book, createdAt } = req.body;
        const { _id } = req.user;

        models.Comment.create({ content, book, createdAt, creator: _id })
            .then((createdComment) => {
                return Promise.all([
                    models.User.updateOne({ _id }, { $push: { comments: createdComment } }),
                    models.Comment.findOne({ _id: createdComment._id })
                ]);
            })
            .then(([modifiedObj, comment]) => {
                res.send(comment);
            })
            .catch(next);
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { content } = req.body;
        models.Comment.updateOne({ _id: id }, { content })
            .then((updatedComment) => res.send(updatedComment))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.Comment.deleteOne({ _id: id })
            .then((removedComment) => res.send(removedComment))
            .catch(next)
    }
};