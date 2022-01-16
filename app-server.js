require('dotenv').config();
const express = require('express');
const auth = require('./middlewares/auth');
const path = require('path');
const admin = require('./routes/app/admin/admin');
const fetch = require('node-fetch');

// Create main app server
const server = express();

// Login page
server.get('/login', (req, res) => {
    res.send('Login here!');
});

// Add middlewares
server.use(auth.authenticate);
server.use('/admin', admin.router);

// Homepage
server.get('/', (req, res) => {
    res.send(`Welcome ${req.user.username}!`);
});

// Set static directory
server.use(express.static(path.join(__dirname, 'static')));

// Start server
server.listen(8080);