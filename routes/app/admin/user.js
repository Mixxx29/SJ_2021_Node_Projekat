// Imports
const express = require('express');

// Create router
const router = express.Router();

// Users page
router.get('/', (req, res) => {
    res.sendFile('./admin/html/users.html', {root: './static'});
});

// Create new user page
router.get('/create', (req, res) => {
    res.sendFile('./admin/html/user.html', {root: './static'});
});

// Edit user page
router.get('/edit/:id', (req, res) => {
    res.sendFile('./admin/html/user.html', {root: './static'});
});

// Export
module.exports = {router};
