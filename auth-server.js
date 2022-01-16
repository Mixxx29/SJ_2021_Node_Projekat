// Imports
const express = require('express');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Create authentication server
const server = express();

// Set middleware
server.use(express.json());

// Login
server.post('/login', (req, res) => {
    fetch(`http://127.0.0.1:8081/users/username/${req.body.username}`, {
        method: 'GET'
    }).then(result => result.json().then(user => {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            // Create token
            const payload = {
                id: user.id,
                username: user.username,
                authority: user.authority
            };

            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'});

            res.send(token);
        } else {
            res.send('Incorrect username or password!');
        }
    }).catch(() => {
        res.send('Incorrect username or password!');
    })).catch(err => {
        res.status(500).send(err);
    });
});

// Register route
server.post('/register', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    fetch(`http://127.0.0.1:8081/users`, {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {'Content-Type': 'application/json'}
    }).then(result => result.json()).then(user => {
        if (user == null) return res.send('Username taken!');

        // Create token
        const payload = {
            id: user.id,
            username: user.username,
            authority: user.authority
        };

        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'});

        res.send(token);
    }).catch(err => {
        res.status(500).send(err);
    });
});

// Start server
server.listen(8082);