const express = require('express');
const bookCtrl = require('../controllers/book');
const auth = require('../middelware/auth');
const multer = require('../middelware/multer-config');

const router = express.Router();

router.get('/', bookCtrl.getBooks);
router.get('/bestrating', bookCtrl.getBestRating);
router.get('/:id', bookCtrl.getOneBook);
router.post('/', auth, multer, bookCtrl.createBook);
router.put('/:id', auth, multer, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.rateBook);
module.exports = router;
