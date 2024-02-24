const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number_of_episode: { type: Number },
    Status: { type: String, enum: ['En cours', 'Terminé'] },
    first_broadcast_date: { type: Date },
    last_broadcast_date: { type: Date },
    animation_studio: [{ type: String }],
    genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
});

module.exports = mongoose.model('Anime', animeSchema);
