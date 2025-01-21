const express = require('express');
const mongoose = require('mongoose');
const bookRouter = require('./routes/book');
const userRouter = require('./routes/user');

const app = express();
mongoose
	.connect(
		'mongodb+srv://Alan:nalag@cluster0.ww9z2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
		{ useNewUrlParser: true, useUnifiedTopology: true },
	)
	.then(() => console.log('Connexion à MongoDB réussie'))
	.catch(() => console.log('Connexion à MonDB échouée'));
app.use(express.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin,X-Requested-With,Content,Accept,Content-Type,Authorization',
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET,POST,PUT,DELETE,PATCH,OPTIONS',
	);
	next();
});

/*app.use((req, res) => {
	res.json({ message: 'votre requête a bien été reçue' });
});*/
app.use('/api/books/', bookRouter);
app.use('/api/auth', userRouter);

module.exports = app;
