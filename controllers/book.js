const Book = require('../models/book');
const fs = require('fs');

exports.getBooks = (req, res) => {
	Book.find()
		.then((books) => res.status(201).json(books))
		.catch((error) => res.status(500).json(error));
};
exports.getOneBook = (req, res, next) => {
	const book = Book.findOne({
		_id: req.params.id,
	})
		.then((book) => res.status(201).json(book))
		.catch((error) => res.status(500).json(error));
};
exports.getBestRating = (req, res) => {
	res.status(201).json({ message: 'Requête Get pour fonction getBestRating' });
};
exports.createBook = (req, res, next) => {
	console.log(req.body.book);
	const bookObject = JSON.parse(req.body.book);
	delete bookObject.userId;
	const book = new Book({
		...bookObject,
		userId: req.auth.userId,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
	});
	book
		.save()
		.then(() =>
			res
				.status(201)
				.json({ message: 'Requête POST pour fonction createBook' }),
		)
		.catch((error) =>
			res.status(404).json({ message: 'enregistrement échoué' }),
		);
};
exports.modifyBook = (req, res, next) => {
	//res.status(201).json({ message: 'Requête PUT pour fonction modifyBook' });
	const bookObject = req.file
		? {
				...JSON.parse(req.body.book),
				imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
			}
		: { ...req.body };
	delete bookObject.userId;
	Book.findOne({ _id: req.params.id })
		.then((book) => {
			if (book.userId != req.auth.userId) {
				res.status(401).json({ message: 'not authorized' });
			} else {
				Book.updateOne(
					{
						_id: req.params.id,
					},
					{ ...bookObject, _id: req.params.id },
				)
					.then(() => res.status(201).json({ message: 'book modified' }))
					.catch((error) => res.status(400).json({ error }));
			}
		})
		.catch((error) => res.status(500).json(error));
};
exports.deleteBook = (req, res) => {
	//res.status(201).json({ message: 'Requête PUT pour fonction deleteBook' });
	Book.findOne({
		_id: req.params.id,
	})
		.then((book) => {
			if (book.userId != req.auth.userId) {
				res.status(400).json({ message: 'Not authorized' });
			} else {
				const filename = book.imageUrl.split('/images/')[1];
				fs.unlink(`images/${filename}`, () => {
					book
						.deleteOne({ _id: req.params.id })
						.then(() => res.status(200).json({ message: 'book deleted' }))
						.catch((error) => res.status(401).json(error));
				});
			}
		})
		.catch((error) => res.status(500).json(error));
};
exports.rateBook = (req, res) => {
	res.status(201).json({ message: 'Requête POST pour fonction rateBook' });
};
