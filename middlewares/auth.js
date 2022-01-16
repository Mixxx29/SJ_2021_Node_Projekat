// Imports
const jwt = require('jsonwebtoken');

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImF1dGhvcml0eSI6eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaXNFbXBsb3llZSI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyMi0wMS0xNVQyMzozNTozMi4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMi0wMS0xNVQyMzozNTozMi4wMDBaIiwidXNlcklEIjoxfSwiaWF0IjoxNjQyMjkyMDE3LCJleHAiOjE2NDIyOTM4MTd9.6S32kIhFiH9KD3vMHArahAJMglDZgFazGR6IvVPTMMU';

// Middleware functions
function authenticate(req, res, next) {
    // Get token
    if (token == null) {
        const authHeader = req.headers['authorization'];
        token = authHeader && authHeader.split(' ')[1];
    }

    // Redirect to login page
    if (token == null) return res.redirect('http://127.0.0.1:8080/login');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        // Redirect to login page
        if (err) return res.redirect('http://127.0.0.1:8080/login');

        req.user = user;
        next();
    });
}

function isAdmin(req, res, next) {
    if (req.user.authority) {
        if (req.user.authority.isAdmin) {
            return next();
        }
    }
    return res.sendStatus(401);
}

// Export
module.exports = {authenticate, isAdmin};
