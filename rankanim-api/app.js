const express = require('express');

const app = express();

const appVersion = '1.0.0'

app.get('/api/version', (req, res) => {
   res.json({ version: appVersion }); 
});

module.exports = app;