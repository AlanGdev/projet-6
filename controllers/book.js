const Book = require('../models/book');

exports.getBooks = (req, res) => {
	res.status(201).json({
		message: 'requête GET pour réponse getBooks',
	});
};
exports.getOneBook = (req, res) => {
	res.status(201).json({ message: 'Requête Get pour fonction getOneBook' });
};
exports.getBestRating = (req, res) => {
	res.status(201).json({ message: 'Requête Get pour fonction getBestRating' });
};
exports.createBook = (req, res) => {
	res.status(201).json({ message: 'Requête POST pour fonction createBook' });
};
exports.modifyBook = (req, res) => {
	res.status(201).json({ message: 'Requête PUT pour fonction modifyBook' });
};
exports.deleteBook = (req, res) => {
	res.status(201).json({ message: 'Requête PUT pour fonction deleteBook' });
};
exports.rateBook = (req, res) => {
	res.status(201).json({ message: 'Requête POST pour fonction rateBook' });
};
