const express = require('express');
const router = express.Router();

const genreController = require('../controllers/genre');

// Create genre
router.post('/', genreController.createGenre);

// Get all genres
router.get('/', genreController.getGenres);

// Find genre
router.get('/:id', genreController.findGenre);

// Update genre
router.put('/:id', genreController.updateGenre);

// Delete genre
router.delete('/:id', genreController.deleteGenre);

module.exports = router;
