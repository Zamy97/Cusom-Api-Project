const express = require('express');
const router = express.Router();

Genre = require('../models/genre.model.js');

router.get('/api/books', (req, res) => {
	Book.getBooks((err, books) => {
		if(err){
			throw err;
		}
		res.json(books);
	});
});
