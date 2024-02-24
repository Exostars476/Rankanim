const Anime = require('../models/Anime');

// Create anime
exports.createAnime = (req, res, next) => {
    delete req.body._id;
    const anime = new Anime({ ...req.body });

    anime
        .save()
        .then(() => {
            res.status(201).json({ message: anime.name + ' créé avec succès !' });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Create many animes
exports.createManyAnimes = (req, res, next) => {
    console.log('Debut create many');
    Anime.insertMany(req.body)
        .then((result) => {
            res.status(201).json({ message: `${result.length} Animes créés avec succès !` });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

// Get all animes
exports.getAnimes = (req, res, next) => {
    Anime.find()
        .populate('genres', 'name')
        .then((animes) => {
            res.status(200).json(animes);
        })
        .catch((error) => {
            res.status(404).json({ error });
        });
};

// Get all animes
exports.getAnimesQuickList = (req, res, next) => {
    Anime.find({}, 'name')
        .then((animes) => {
            res.status(200).json(animes);
        })
        .catch((error) => {
            res.status(404).json({ error });
        });
};

// Find anime
exports.findAnime = (req, res, next) => {
    Anime.findOne({ _id: req.params.id })
        .populate('genres', 'name')
        .then((anime) => {
            res.status(200).json(anime);
        })
        .catch((error) => {
            res.status(404).json({ error });
        });
};

// Update anime
exports.updateAnime = (req, res, next) => {
    Anime.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => {
            res.status(201).json({ message: 'Anime modifié avec succès !' });
        })
        .catch((error) => {
            res.status(404).json({ error });
        });
};

// Delete anime
exports.deleteAnime = (req, res, next) => {
    Anime.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: 'Anime supprimé avec succès !' });
        })
        .catch((error) => {
            res.status(404).json({ error });
        });
};
