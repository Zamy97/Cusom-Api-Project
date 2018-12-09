const express = require('express');
const router = express.Router();

Genre = require('../models/genre.model.js');

/* GET home page. */
router.get('/api/genres', function(req, res, next) {
    Genre.getGenres(function(err, genres) {
        if (err){
            throw err;
        }
        res.json(genres);
    });
});



module.exports = router;
