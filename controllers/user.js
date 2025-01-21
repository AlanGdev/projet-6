const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
	//res.status(201).json({ message: 'requête POST sur fonction userLogin' });
	User.findOne({ email: req.body.email })
		.then((user) => {
			if (!user) {
				return res
					.status(401)
					.json({ message: 'Paire login / mot de passe incorrecte' });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((validation) => {
					if (!validation) {
						return res
							.status(401)
							.json({ message: 'Paire login / mot de passe incorrecte' });
					}
					res.status(201).json({
						userId: user._id,
						token: jwt.sign(
							{
								userId: user._id,
							},
							'RANDOM_TOKEN_SECRET',
							{ expiresIn: '24h' },
						),
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(404).json({ message: 'user non trouvé' }));
};
