const express = require('express');
const router = express.Router();
const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model.js');
const auth = require('../auth');
const jwt = require('jsonwebtoken');

// Register User

router.post('/api/register', (req, res, next) => {
    const { email, password } = req.body;

    const user = new User({
        email,
        password
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, async (err, hash) => {
            // Hash password
            user.password = hash;
            // Save user
            try {
                const newUser = await user.save();
                res.sendStatus(201);
                // next()
            } catch(err) {
                return next(new errors.InternalError(err.message));
            }
        });
    });
});

// Auth User

router.post('/api/auth',async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // authenticate user
        const user = await auth.authenticate(email, password)

        // Create JWt
        const token = jwt.sign(user.toJSON(), 'secret1', {
            expiresIn: '15d'
        });

        const { iat, exp } = jwt.decode(token);
        // Respond with token
        res.send({ iat, exp, token });

    } catch(err) {
        // User unauthorized
        return next(new errors.UnauthorizedError(err));
    }
});

module.exports = router;
