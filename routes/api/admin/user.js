// Imports
const express = require('express');
const {User, Authority} = require("../../../models");
const bcrypt = require("bcrypt");

// Create router
const router = express.Router();

// Get all users
router.get('/', (req, res) => {
    User.findAll({include: ['authority']}).then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Get user
router.get('/:id', (req, res) => {
    User.findOne({where: {id: req.params.id}, include: ['authority']}).then(user => {
        res.json(user);
    }).catch(err => {
        res.status(500).send(err);
    });
});

// Create user
router.post('/', (req, res) => {
    User.findOne({where: {username: req.body.username}}).then(row => {
        if (row) return res.json(null);

        const userObject = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10)
        };

        User.create(userObject).then(newUser => {
            res.json(newUser);
        });
    }).catch(err => {
        res.status(500).send(err);
    });
});

// Edit user
router.put('/', (req, res) => {
    User.findOne({where: {id: req.body.id}}).then(user => {
        if (user) {
            user.username = req.body.username;
            user.password = bcrypt.hashSync(req.body.password, 10)

            user.save().then(saved => {
                res.json(saved);
            }).catch(err => {
                res.status(500).json(err);
            });
        }
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Delete users
router.delete('/', (req, res) => {
    if (req.body.id) {
        User.destroy({where: {id: req.body.id}}).then(() => {
            res.send(true);
        }).catch(() => {
            res.send(null);
        });
    } else {
        User.destroy({truncate: true}).then(() => {
            Authority.destroy({truncate: true}).then(() => {
                const adminObject = {
                    username: process.env.ADMIN_USERNAME,
                    password: process.env.ADMIN_PASSWORD
                };
                User.create(adminObject).then(admin => {
                    Authority.create({
                        userID: admin.id,
                        isAdmin: true,
                        isEmployee: true
                    }).then(() => {
                        res.send('Deleted!');
                    });
                });
            });
        });
    }
});

// Export
module.exports = {router};