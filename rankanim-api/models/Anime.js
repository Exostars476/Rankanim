const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number_of_episode: { type: Number, required: true },
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
});

module.exports = mongoose.model('Anime', animeSchema);
