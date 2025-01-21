const Book = require('../models/book');

exports.getBooks = (req, res) => {
	res
		.status(201)
		.json({
			message: 'Réponse à requête GET sur route /api/books via controllers',
		});
};
