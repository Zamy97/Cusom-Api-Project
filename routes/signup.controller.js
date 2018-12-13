const express = require('express');
const router = express.Router();



// Sign up form
router.get('/api/sign-up', (req, res) => {
    res.render('sign-up.hbs');
    // res.send("something")
});

module.exports = router;
