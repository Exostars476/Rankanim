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

// Add anime to the connected user
router.post('/anime/add', auth, userController.addAnimeToUser);

// Get anime of the connected user
router.get('/anime', auth, userController.getUserAnimes);

// Update an anime rating of the connected user
router.put('/anime/update', auth, userController.updateAnimeRating);

module.exports = router;
