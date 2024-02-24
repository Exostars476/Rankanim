const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animeSchema = new Schema({
    name: { type: String, required: true },
    number_of_episode: { type: Number, required: true },
    genres: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
});

const Anime = mongoose.model('Anime', animeSchema);
