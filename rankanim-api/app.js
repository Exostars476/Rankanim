require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const genreRoute = require('./routes/genre.js');
const animeRoute = require('./routes/anime.js');
const userRoute = require('./routes/user.js');

const app = express();

const appVersion = '1.0.0';

// MongoDB connexion
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
mongoose
    .connect(
        'mongodb+srv://' + dbUser + ':' + dbPass + '@exostarscluster.ysrkpqs.mongodb.net/?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    )
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Access config
app.use((req, res, next) => {
    const allowedOrigins = ['http://127.0.0.1:4200', 'http://127.0.0.1:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// JSON PARSER
app.use(express.json());

app.get('/api/version', (req, res) => {
    res.json({ version: appVersion });
});

// Routes
app.use('/api/genre', genreRoute);
app.use('/api/anime', animeRoute);
app.use('/api/user', userRoute);

module.exports = app;
