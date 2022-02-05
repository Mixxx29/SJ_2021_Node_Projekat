// Imports
const express = require('express');
const auth = require('../../../middlewares/auth');
const user = require('./user');
const authority = require('./authority');
const appointment = require('./appointment');
const notification = require('./notification');

// Create router
const router = express.Router();

// Add middlewares
router.use(express.json());
router.use(auth.isAdmin);
router.use('/users', user.router);
router.use('/authorities', authority.router);
router.use('/appointments', appointment.router);
router.use('/notifications', notification.router);


// Export
module.exports = {router};
