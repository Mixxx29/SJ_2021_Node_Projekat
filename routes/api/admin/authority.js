// Imports
const express = require('express');
const {Authority} = require("../../../models");

// Create router
const router = express.Router();

// Get all authorities
router.get('/', (req, res) => {
    Authority.findAll({include: ['user']}).then(authorities => {
        res.json(authorities);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Get authority
router.get('/:id', (req, res) => {
    Authority.findOne({where: {id: req.params.id}, include: ['user']}).then(authority => {
        res.json(authority);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Create new authority
router.post('/', (req, res) => {
    let authority = {
        userID: req.body.userID,
        isAdmin: req.body.isAdmin,
        isEmployee: req.body.isEmployee
    };
    Authority.create(authority).then(newAuthority => {
        res.json(newAuthority);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Update authority
router.put('/', (req, res) => {
    Authority.findOne({where: {id: req.body.id}}).then(authority => {
        if (authority) {
            authority.isAdmin = req.body.isAdmin;
            authority.isEmployee = req.body.isEmployee;

            if (!authority.isAdmin && !authority.isEmployee) {
                Authority.destroy({where: {id: authority.id}}).then(deleted => {
                    res.json(deleted);
                }).catch(err => {
                    res.status(500).json(err);
                });
            } else {
                authority.save().then(saved => {
                   res.json(saved);
                }).catch(err => {
                    res.status(500).json(err);
                });
            }
        } else {
            res.status(404).json({err: "No user found!"});
        }
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Delete authority
router.delete('/', (req, res) => {
    Authority.destroy({where: {id: req.body.id}}).then(authority => {
        res.json(authority);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Export
module.exports = {router};