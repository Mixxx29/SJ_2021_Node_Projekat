require('dotenv').config();
const express = require('express');
const path = require('path');
const admin = require('./routes/app/admin/admin');
const history = require('connect-history-api-fallback');

// Create main app server
const server = express();

// Add middlewares
server.use(express.json());
server.use('/admin', admin.router);

// Set static directory
const staticDir = express.static(path.join(__dirname, 'dist'));

server.use(staticDir);
server.use(history({index: '/index.html'}));
server.use(staticDir);

// Start server
server.listen(8080);