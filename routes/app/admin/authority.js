// Imports
const express = require('express');

// Create router
const router = express.Router();

// Authorities page
router.get('/', (req, res) => {
    res.sendFile('./admin/html/authorities.html', {root: './static'});
});

// Create new authority page
router.get('/create', (req, res) => {
    res.sendFile('./admin/html/authority.html', {root: './static'});
});

// Edit authority page
router.get('/edit/:id', (req, res) => {
    res.sendFile('./admin/html/authority.html', {root: './static'});
});

// Export
module.exports = {router};
