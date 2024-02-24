const Genre = require('../models/Genre');

exports.createGenre = (req, res, next) => {
    delete req.body._id;
    const genre = new Genre({ ...req.body });

    genre
        .save()
        .then(() => {
            res.status(201).json({ message: 'Genre ' + genre.name + ' créé avec succès !' });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.getGenres = (req, res, next) => {
    Genre.find()
        .then((genres) => {
            res.status(201).json(genres);
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.findGenre = (req, res, next) => {
    Genre.findOne({ _id: req.params.id })
        .then((genre) => {
            res.status(201).json(genre);
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};
