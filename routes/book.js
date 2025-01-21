const express = require('express');
const bookCtrl = require('../controllers/book');

const router = express.Router();

router.get('/', bookCtrl.getBooks);
router.get('/bestrating', bookCtrl.getBestRating);
router.get('/:id', bookCtrl.getOneBook);
router.post('/', bookCtrl.createBook);
router.put('/:id', bookCtrl.modifyBook);
router.delete('/:id', bookCtrl.deleteBook);
router.post('/:id/rating', bookCtrl.rateBook);
module.exports = router;
