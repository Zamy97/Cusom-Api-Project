const express = require('express');
const router = express.Router();

Genre = require('../models/genre.model.js');

router.get('/api/genres', function(req, res, next) {
    Genre.getGenres(function(err, genres) {
        if (err){
            throw err;
        }
        res.json(genres);
    });
});

router.post('/api/genres', (req, res) => {
	var genre = req.body;
	Genre.addGenre(genre, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});


app.put('/api/genres/:_id', (req, res) => {
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.delete('/api/genres/:_id', (req, res) => {
	var id = req.params._id;
	Genre.removeGenre(id, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});



module.exports = router;
