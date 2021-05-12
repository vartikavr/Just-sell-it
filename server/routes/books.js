const express = require('express');
const router = express.Router();
const Book = require('../schemas/books');
const books = require('../controllers/books');

const { isLoggedIn, isVerified, isBookOwner, isBookOwnerOrAdmin } = require('../middleware');

router.get('/', isLoggedIn, isVerified, books.getBooks)

router.get('/:id', isLoggedIn, isVerified, books.specificBook)

router.post('/new', isLoggedIn, isVerified, books.newBook)

router.post('/:id/edit', isLoggedIn, isVerified, isBookOwner, books.editBook)

router.post('/:id/delete', isLoggedIn, isVerified, isBookOwnerOrAdmin, books.deleteBook)

module.exports = router;