// Imports
const express = require('express');
const {Notification} = require("../../../models");

// Create router
const router = express.Router();

// Get all notifications
router.get('/', (req, res) => {
    Notification.findAll({include: ['user', 'appointment']}).then(notification => {
        res.json(notification);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Get notification
router.get('/:id', (req, res) => {
    Notification.findOne({where: {id: req.params.id}, include: ['user', 'appointment']}).then(notification => {
        res.json(notification);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Create new notification
router.post('/', (req, res) => {
    let notification = {
        userID: req.body.userID,
        appointmentID: req.body.appointmentID,
        message: req.body.message
    };
    Notification.create(notification).then(newNotification => {
        res.json(newNotification);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Update notification
router.put('/', (req, res) => {
    Notification.findOne({where: {id: req.body.id}}).then(notification => {
        if (notification) {
            notification.userID = req.body.userID;
            notification.appointmentID = req.body.appointmentID;
            notification.message = req.body.message;

            notification.save().then(saved => {
                res.json(saved);
            }).catch(err => {
                res.status(500).json(err);
            });
        } else {
            res.status(404).json({err: "No notification found!"});
        }
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Delete notification
router.delete('/', (req, res) => {
    Notification.destroy({where: {id: req.body.id}}).then(notification => {
        res.json(notification);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Export
module.exports = {router};