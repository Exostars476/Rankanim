const express = require('express');
const router = express.Router();

const animeController = require('../controllers/anime');

// Create anime
router.post('/', animeController.createAnime);

// Get all animes
router.get('/', animeController.getAnimes);

// Find anime
router.get('/:id', animeController.findAnime);

// Update anime
router.put('/:id', animeController.updateAnime);

// Delete anime
router.delete('/:id', animeController.deleteAnime);

module.exports = router;
