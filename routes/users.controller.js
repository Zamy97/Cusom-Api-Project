const express = require('express');
const router = express.Router();
const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model.js');

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
    console.log(hash);
});

module.exports = router;
