// Imports
const express = require('express');
const {Appointment} = require("../../../models");
const { Sequelize, Op } = require("sequelize");

// Create router
const router = express.Router();

// Get appointment
router.get('/:date', (req, res) => {
    date = req.params.date.split('-');
    Appointment.findAll({
        where: {
            [Op.and]: [
                Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date')), date[1]),
                Sequelize.where(Sequelize.fn('DAY', Sequelize.col('date')), date[2]),
            ],
            status: 'APPROVED'
        }}).then(appointments => {
        res.json(appointments);
    }).catch(err => {
        res.status(500).json(err);
    });
});

// Export
module.exports = {router};