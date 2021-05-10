const express = require('express');
const router = express.Router();
const Book = require('../schemas/books');
const books = require('../controllers/books');

const { isLoggedIn, isBookOwner, isBookOwnerOrAdmin } = require('../middleware');

router.get('/', isLoggedIn, books.getBooks)

router.get('/:id', isLoggedIn, books.specificBook)

router.post('/new', isLoggedIn, books.newBook)

router.post('/:id/edit', isLoggedIn, isBookOwner, books.editBook)

router.post('/:id/delete', isLoggedIn, isBookOwnerOrAdmin, books.deleteBook)

module.exports = router;