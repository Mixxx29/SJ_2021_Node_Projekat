// Imports
const express = require('express');
const {Appointment} = require("../../../models");

// Create router
const router = express.Router();

// Get all appointments
router.get('/', (req, res) => {
    Appointment.findAll({include: ['user', 'employee']}).then(appointment => {
        res.json(appointment);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Get appointment
router.get('/:id', (req, res) => {
    Appointment.findOne({where: {id: req.params.id}, include: ['user', 'employee']}).then(appointment => {
        res.json(appointment);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Create new appointment
router.post('/', (req, res) => {
    let appointment = {
        userID: req.body.userID,
        date: req.body.date,
        employeeID: req.body.employeeID,
        status: req.body.status
    };
    Appointment.create(appointment).then(newAppointment => {
        res.json(newAppointment);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Update appointment
router.put('/', (req, res) => {
    Appointment.findOne({where: {id: req.body.id}}).then(appointment => {
        if (appointment) {
            appointment.userID = req.body.userID;
            appointment.date = req.body.date;
            appointment.employeeID = req.body.employeeID;
            appointment.status = req.body.status;

            appointment.save().then(saved => {
                res.json(saved);
            }).catch(err => {
                res.status(500).json(err);
            });
        } else {
            res.status(404).json({err: "No appointment found!"});
        }
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Delete appointment
router.delete('/', (req, res) => {
    Appointment.destroy({where: {id: req.body.id}}).then(appointment => {
        res.json(appointment);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Export
module.exports = {router};