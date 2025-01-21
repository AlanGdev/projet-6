const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.userSignup = (req, res, next) => {
	//res.status(201).json({ message: 'requête POST sur fonction userSignup'
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const user = new User({
				email: req.body.email,
				password: hash,
			});
			user
				.save()
				.then(() => res.status(201).json({ message: 'Utilisateur créé!' }))
				.catch((error) => res.status(404).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

exports.userLogin = (req, res, next) => {
	res.status(201).json({ message: 'requête POST sur fonction userLogin' });
};
