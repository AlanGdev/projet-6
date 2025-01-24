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
	//res.status(201).json({ message: 'Requête Get pour fonction getBestRating' });
	Book.find()
	.then(books=>{books.sort((a,b)=>b.averageRating-a.averageRating	)
		//books.map((book)=>{console.log(book.title + book.averageRating)})
		const bestrating=books.slice(0,3)
		console.log(bestrating)
		res.status(201).json(bestrating)
	}
)	
};
exports.createBook = (req, res, next) => {
	console.log(req.body.book);
	const bookObject = JSON.parse(req.body.book);
	delete bookObject.userId;
	console.log(bookObject.ratings)
	const book = new Book({
		...bookObject,
		userId: req.auth.userId,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
		ratings: [{
			userId:req.auth.userId,
			grade:bookObject.ratings[0].grade
		}],
		averageRating:bookObject.ratings[0].grade
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
					.then(res.status(201).json({ message: 'book modified' }))
					.catch((error) => res.status(400).json({ error }));
			}
		})
		.catch((error) => res.status(500).json(error));
};
exports.deleteBook = (req, res) => {
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
	console.log(`fonction rateBook: req.params:`)
	//console.log(req.params)
	//console.log('req.body')
	//console.log(req.body)
	//console.log('authorization')
	//console.log(req.auth)

	const book=Book.findOne({_id:req.params.id})
	.then(book=>{
		//console.log(book)
		const rating={userId:req.body.userId,
			grade:req.body.rating
		}
		//console.log(book)
		//console.log(rating)
		const ratings=book.ratings
		ratings.push(rating)
		//console.log(rating)
		const averageRating=ratings.reduce((acc, current) => {
			return acc + (current.grade);
		},0)/ratings.length
		//console.log(averageRating)
		Book.updateOne({
			_id:req.params.id},{_id:req.params.id,
			ratings:ratings,
		averageRating:averageRating})
		.then(()=>{
			//console.log(book)
			res.status(201).json(book)})
		}

	)
}

