const express = require('express');

const bookController = require('../controllers/book.controller');

const router = express.Router();

router.route('/').get(bookController.list).post(bookController.create);
router.route('/:id').put(bookController.update).delete(bookController.remove);

module.exports = router;
