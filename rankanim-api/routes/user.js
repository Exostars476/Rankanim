const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

// Create user
router.post('/signup', userController.createUser);

// Create user
router.post('/login', userController.login);

// Get all users
router.get('/', userController.getUsers);

// Delete user
router.delete('/:id', userController.deleteUser);

module.exports = router;
