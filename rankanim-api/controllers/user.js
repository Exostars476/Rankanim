require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

// Create user
exports.createUser = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
                username: req.body.username,
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // User exist ?
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Combinaison identifiant/mot de passe incorrecte !' });
        }

        // Password verification
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            return res.status(401).json({ message: 'Combinaison identifiant/mot de passe incorrecte !' });
        }

        // Create and send JWT Token
        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '24h' });

        res.status(200).json({
            userId: user._id,
            token: token,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users
exports.getUsers = (req, res, next) => {
    User.find()
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => res.status(500).json({ error }));
};

// Delete user
exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: 'Utilisateur supprimé avec succès !' });
        })
        .catch((error) => res.status(500).json({ error }));
};

// Add anime to user
exports.addAnimeToUser = (req, res, next) => {
    const userId = req.auth.userId;
    const { animeId, rating } = req.body;

    // Verify rating between 0 and 10
    if (rating < 0 || rating > 10) {
        return res.status(400).json({ message: 'La note doit être entre 0 et 10.' });
    }

    // Find user and update it with animes
    User.findByIdAndUpdate(
        userId,
        { $push: { animes: { anime: animeId, rating: rating } } }, // Add the new anime and its rating
        { new: true, safe: true, upsert: false }, // Options : return updated user with safe mode and do not create if not exist
    )
        .then((user) => {
            if (!user) {
                return res.status(400).json({ message: 'Utilisateur introuvable' });
            }
            res.status(200).json({ message: "Anime ajouté à l'utilisateur ", user });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

// Get anime of the connected user
exports.getUserAnimes = (req, res, next) => {
    const userId = req.auth.userId;

    User.findById(userId)
        .populate('animes.anime', 'name rating')
        .select('animes')
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur introuvable' });
            }
            res.status(200).json(user.animes);
        })
        .catch((error) => res.status(500).json({ error }));
};

// Update an anime rating of the connected user
exports.updateAnimeRating = (req, res, next) => {
    const userId = req.auth.userId;
    const { animeId, newRating } = req.body;

    // Verify new rating between 0 and 10
    if (newRating < 0 || newRating > 10) {
        return res.status(400).json({ message: 'La note doit être entre 0 et 10.' });
    }

    // Find user and update it with new anime rating
    User.findOneAndUpdate(
        { _id: userId, 'animes.anime': animeId }, // Critère de recherche
        { $set: { 'animes.$.rating': newRating } },
        { new: true },
    )
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur introuvable.' });
            }
            res.status(200).json({ message: 'Note mise à jour avec succès', animes: user.animes });
        })
        .catch((error) => res.status(500).json({ error }));
};
