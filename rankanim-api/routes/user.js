const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

// Create user
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.getUsers);

// Find user
router.get('/:id', userController.findUser);

// Update user
router.put('/:id', userController.updateUser);

// Delete user
router.delete('/:id', userController.deleteUser);

module.exports = router;
