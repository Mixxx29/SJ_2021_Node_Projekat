// Imports
const express = require('express');
const cors = require('cors');
const auth = require("./middlewares/auth");
const admin = require('./routes/api/admin/admin');
const {sequelize} = require("./models");
const {User} = require("./models");
require('dotenv').config();

// Create database server
const server = express();

let corsSettings = {
    origin: 'http://127.0.0.1:8080',
    optionsSuccessStatus: 200
};

// Add middlewares
server.use(express.json());
server.use(cors(corsSettings));

// Get user by username
server.get('/users/username/:username', (req, res) => {
    User.findOne({where: {username: req.params.username}, include: ['authority']}).then(user => {
        res.json(user);
    }).catch(err => {
        res.status(500).send(err);
    });
});

// Create user
server.post('/users', (req, res) => {
    User.findOne({where: {username: req.body.username}}).then(user => {
        if (user) return res.json(null);

        const userObject = {
            username: req.body.username,
            password: req.body.password
        };

        User.create(userObject).then(newUser => {
            res.json(newUser);
        });
    }).catch(err => {
        res.status(500).send(err);
    });
});

server.use(auth.authenticate);
server.use('/admin', admin.router);

// Get user by id
server.get('/users/:id', (req, res) => {
    User.findOne({where: {id: req.params.id}, include: ['authority']}).then(user => {
        res.json(user);
    }).catch(err => {
        res.status(500).send(err);
    });
});

// Start server and connect to database
server.listen({port: 8081}, async () => {
    await sequelize.authenticate();
});