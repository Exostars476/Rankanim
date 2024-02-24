const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    animes: [
        {
            anime: { type: Schema.Types.ObjectId, ref: 'Anime' },
            rating: { type: Number, min: 0, max: 10 },
        },
    ],
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
