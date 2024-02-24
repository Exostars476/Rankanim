const express = require('express');
const router = express.Router();

const genreController = require('../controllers/genre');

// Create genre
router.post('/', genreController.createGenre);

// Find a genre
router.get('/:id', genreController.findGenre);

// Get all genres
router.get('/', genreController.getGenres);

module.exports = router;
