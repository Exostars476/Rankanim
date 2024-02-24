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
