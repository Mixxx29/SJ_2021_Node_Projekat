// Imports
const express = require('express');

// Create router
const router = express.Router();

// Notifications page
router.get('/', (req, res) => {
    res.sendFile('./admin/html/notifications.html', {root: './static'});
});

// Create new authority page
router.get('/create', (req, res) => {
    res.sendFile('./admin/html/notification.html', {root: './static'});
});

// Edit authority page
router.get('/edit/:id', (req, res) => {
    res.sendFile('./admin/html/notification.html', {root: './static'});
});

// Export
module.exports = {router};
