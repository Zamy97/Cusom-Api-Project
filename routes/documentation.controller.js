const express = require('express');
const router = express.Router();

// Documentation route
router.get('/api/documentation', (req, res) => {
    res.render('documentation.hbs')
});

module.exports = router;
