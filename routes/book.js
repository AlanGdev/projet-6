const express = require('express');
const bookCtrl = require('../controllers/book');
const auth = require('../middelware/auth');

const router = express.Router();

router.get('/', bookCtrl.getBooks);
router.get('/bestrating', bookCtrl.getBestRating);
router.get('/:id', bookCtrl.getOneBook);
router.post('/', auth, bookCtrl.createBook);
router.put('/:id', auth, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.rateBook);
module.exports = router;
