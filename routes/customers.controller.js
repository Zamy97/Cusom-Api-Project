const express = require('express');
const router = express.Router();

router.get('/api/customers', (req, res) => {
    res.send("Testing the route")
});


module.exports = router;
