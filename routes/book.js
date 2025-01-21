const express = require('express');
const bookCtrl = require('../controllers/book');

const router = express.Router();

router.get('/', bookCtrl.getBooks);
module.exports = router;
