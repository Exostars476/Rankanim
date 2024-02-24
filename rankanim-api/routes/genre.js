const express = require('express');
const router = express.Router();

const genreController = require('../controllers/genre');

// Create genre
router.post('/', genreController.createGenre);

// Get all genres
router.get('/', genreController.getGenres);

// Find a genre
router.get('/:id', genreController.findGenre);

// Create genre
router.put('/:id', genreController.updateGenre);

// Create genre
router.delete('/:id', genreController.deleteGenre);

module.exports = router;
