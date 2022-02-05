// Imports
const jwt = require('jsonwebtoken');

let token = null;

// Middleware functions
function authenticate(req, res, next) {
    // Get token
    if (token == null) {
        const authHeader = req.headers['authorization'];
        token = authHeader && authHeader.split(' ')[1];
    }

    // Redirect to login page
    if (token == null) return res.redirect('https://sj-projekat.herokuapp.com/login');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        // Redirect to login page
        if (err) return res.redirect('https://sj-projekat.herokuapp.com/login');

        req.user = user;
        next();
    });
}

function isAdmin(req, res, next) {
    if (!req.user) {
        // Get token
        if (token == null) {
            const authHeader = req.headers['authorization'];
            token = authHeader && authHeader.split(' ')[1];
        }

        // Redirect to login page
        if (token == null) return res.redirect('https://sj-projekat.herokuapp.com/login');

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            // Redirect to login page
            if (err) return res.redirect('https://sj-projekat.herokuapp.com/login');

            req.user = user;
        });
    }

    if (req.user.authority) {
        if (req.user.authority.isAdmin) {
            return next();
        }
    }
    return res.sendStatus(401);
}

function socketAuthentication(msg, next) {
    if (msg[1].token == null) {
        next(new Error('Not authenticated'));
    } else {
        jwt.verify(msg[1].token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
           if (err) {
               next(new Error({msg: 'Not Authenticated'}));
           } else {
               msg[1].user = user;
               next();
           }
        });
    }
}

// Export
module.exports = {authenticate, isAdmin, socketAuthentication};
