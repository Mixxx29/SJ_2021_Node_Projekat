// Imports
const express = require('express');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require("cors");
require('dotenv').config();

// Create authentication server
const server = express();

let corsSettings = {
    origin: 'http://127.0.0.1:8080',
    optionsSuccessStatus: 200
};

// Add middlewares
server.use(express.json());
server.use(cors(corsSettings));

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

            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

            res.json({token: token, id: user.id, username: user.username});
        } else {
            res.json({token: null, msg: 'Pogresno korisnicko ime ili sifra!'});
        }
    }).catch(() => {
        res.json({token: null, msg: 'Pogresno korisnicko ime ili sifra!'});
    })).catch(err => {
        res.status(500).json(err);
    });
});

// Register route
server.post('/register', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    fetch(`http://127.0.0.1:8081/users`, {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {'Content-Type': 'application/json'}
    }).then(result => {
        result.json().then(user => {
            if (user == null) return res.json({token: null, msg: 'Korisnicko ime je zauzeto!'});

            // Create payload
            const payload = {
                id: user.id,
                username: user.username,
                authority: user.authority
            };

            // Create token
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

            res.json({token: token, id: user.id, username: user.username});
        });
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Start server
server.listen(8082);