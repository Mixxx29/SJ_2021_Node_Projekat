// Imports
const express = require('express');
const cors = require('cors');
const auth = require("./middlewares/auth");
const admin = require('./routes/api/admin/admin');
const user = require('./routes/api/user/user');
const {sequelize} = require("./models");
const {User, Appointment} = require("./models");
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

// Create database server
const server = express();

const httpServer = http.createServer(server);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://sj-projekat.herokuapp.com',
        methods: ['GET', 'POST'],
        credentials: true
    },
    allowEIO3: true
});

io.on('connection', socket => {
    socket.use(auth.socketAuthentication);

    socket.on('change', msg => {
        let appointment = {
            userID: msg.userID,
            date: msg.date,
            employeeID: 11,
            status: 'APPROVED'
        };

        Appointment.create(appointment).then(newAppointment => {
            io.emit('change', JSON.stringify(newAppointment));
        }).catch(err => {
            console.log(err);
        });
    });

    socket.on('error', err => {
        socket.emit('error', err.message);
    });
});

let corsSettings = {
    origin: 'http://sj-projekat.herokuapp.com',
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

server.use('/user', user.router);
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
httpServer.listen({port: 8081}, async () => {
    await sequelize.authenticate();
});