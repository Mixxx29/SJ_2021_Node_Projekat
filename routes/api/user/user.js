// Imports
const express = require('express');
const appointment = require('./appointment');

// Create router
const router = express.Router();

// Add middlewares
router.use(express.json());
router.use('/appointments', appointment.router);

// Export
module.exports = {router};
