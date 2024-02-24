const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    animes: [
        {
            anime: { type: mongoose.Schema.Types.ObjectId, ref: 'Anime' },
            rating: { type: Number, min: 0, max: 10 },
        },
    ],
});

module.exports = mongoose.model('User', userSchema);
