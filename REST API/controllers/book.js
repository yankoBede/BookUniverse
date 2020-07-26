const models = require('../models');

module.exports = {
    get: (req, res, next) => {
      const length = req.query.length ? parseInt(req.query.length) : 20
        models.Book.find().limit(length).populate('creator').populate('comments')
            .then((books) => res.send(books))
            .catch(next);
    },

    post: (req, res, next) => {
        const {
             author,
             title,
             description,
             imageUrl,
             createdAt
            } = req.body;
        const { _id } = req.user;

        models.Book.create({
            author,
            title,
            description,
            imageUrl,
            createdAt, 
            creator: _id })
            .then((createdBook) => {
                return Promise.all([
                    models.User.updateOne({ _id }, { $push: { books: createdBook } }),
                    models.Book.findOne({ _id: createdBook._id })
                ]);
            })
            .then(([modifiedObj, book]) => {
                res.send(book);
            })
            .catch(e => {
                console.error(e);
            });
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const {
             author,
             title,
             description,
             imageUrl
            } = req.body;
        models.Book.updateOne({ _id: id }, { author, title, description, imageUrl })
            .then((updatedBook) => res.send(updatedBook))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        models.Book.deleteOne({ _id: id })
            .then((removedBook) => res.send(removedBook))
            .catch(next)
    }
};