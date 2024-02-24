const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userController = require('../controllers/user');

// Create user
router.post('/signup', userController.createUser);

// Create user
router.post('/login', userController.login);

// Get all users
router.get('/', userController.getUsers);

// Delete user
router.delete('/:id', userController.deleteUser);

// Add anime to connected user
router.post('/anime/add', auth, userController.addAnimeToUser);

module.exports = router;
