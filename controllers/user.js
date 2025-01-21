const User = require('../models/user');

exports.userSignup = (req, res, next) => {
	res.status(201).json({ message: 'requête POST sur fonction userSignup' });
};

exports.userLogin = (req, res, next) => {
	res.status(201).json({ message: 'requête POST sur fonction userLogin' });
};
