const express = require('express');
const router = express.Router();
const Book = require('../schemas/books');
const books = require('../controllers/books');

router.get('/', books.getBooks)

router.get('/:id', books.specificBook)

router.post('/new', books.newBook)

router.post('/:id/edit', books.editBook)

router.post('/:id/delete', books.deleteBook)

module.exports = router;