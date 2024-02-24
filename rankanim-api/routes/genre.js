const express = require('express');
const router = express.Router();

const genreController = require('../controllers/genre');

// Création d'un genre
router.post('/', genreController.createGenre);

module.exports = router;
