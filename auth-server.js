// Imports
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const {sequelize, User} = require("./models");
require('dotenv').config();

// Create authentication server
const server = express();

let corsSettings = {
    origin: 'https://sj-projekat.herokuapp.com',
    optionsSuccessStatus: 200
};

// Add middlewares
server.use(express.json());
server.use(cors(corsSettings));

// Login
server.post('/login', (req, res) => {
    User.findOne({where: {username: req.body.username}, include: ['authority']}).then(user => {
        if (user == null) return res.json({token: null, msg: 'Pogresno korisnicko ime ili sifra!'});

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
    }).catch(err => {
        res.status(500).send(err);
    });
});

// Register route
server.post('/register', (req, res) => {
    User.findOne({where: {username: req.body.username}}).then(user => {
        if (user) return res.json({token: null, msg: 'Korisnicko ime je zauzeto!'});

        const userObject = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10)
        };

        User.create(userObject).then(newUser => {
            // Create payload
            const payload = {
                id: newUser.id,
                username: newUser.username,
                authority: newUser.authority
            };

            // Create token
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

            res.json({token: token, id: newUser.id, username: newUser.username});
        });
    }).catch(err => {
        res.status(500).send(err);
    });
});

// Start server and connect to database
server.listen({ port: process.env.PORT || 8082 }, async () => {
    await sequelize.authenticate();
});