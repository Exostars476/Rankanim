const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

// Get all users
exports.getUsers = (req, res, next) => {
    User.find()
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => res.status(500).json({ error }));
};

// Find user
exports.findUser = (req, res, next) => {};

// Update user
exports.updateUser = (req, res, next) => {};

// Delete user
exports.deleteUser = (req, res, next) => {};
