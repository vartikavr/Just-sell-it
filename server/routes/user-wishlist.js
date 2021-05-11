const express = require('express');
const router = express.Router();
const users = require('../controllers/user-wishlist');

const { isLoggedIn } = require('../middleware');

router.get('/books/:id/add', isLoggedIn, users.addBookToWishlist)

router.get('/cycles/:id/add', isLoggedIn, users.addCycleToWishlist)

router.get('/handicrafts/:id/add', isLoggedIn, users.addHandicraftToWishlist)

router.get('/furniture/:id/add', isLoggedIn, users.addFurnitureToWishlist)

router.get('/others/:id/add', isLoggedIn, users.addItemToWishlist)

router.post('/books/:id/delete', isLoggedIn, users.removeBookFromWishlist)

router.post('/cycles/:id/delete', isLoggedIn, users.removeCycleFromWishlist)

router.post('/furniture/:id/delete', isLoggedIn, users.removeFurnitureFromWishlist)

router.post('/handicrafts/:id/delete', isLoggedIn, users.removeHandicraftFromWishlist)

router.post('/others/:id/delete', isLoggedIn, users.removeItemFromWishlist)

module.exports = router;
