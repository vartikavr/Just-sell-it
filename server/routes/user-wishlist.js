const express = require('express');
const router = express.Router();
const users = require('../controllers/user-wishlist');

const { isLoggedIn, isVerified } = require('../middleware');

router.get('/books/:id/add', isLoggedIn, isVerified, users.addBookToWishlist)

router.get('/cycles/:id/add', isLoggedIn, isVerified, users.addCycleToWishlist)

router.get('/handicrafts/:id/add', isLoggedIn, isVerified, users.addHandicraftToWishlist)

router.get('/furniture/:id/add', isLoggedIn, isVerified, users.addFurnitureToWishlist)

router.get('/others/:id/add', isLoggedIn, isVerified, users.addItemToWishlist)

router.post('/books/:id/delete', isLoggedIn, isVerified, users.removeBookFromWishlist)

router.post('/cycles/:id/delete', isLoggedIn, isVerified, users.removeCycleFromWishlist)

router.post('/furniture/:id/delete', isLoggedIn, isVerified, users.removeFurnitureFromWishlist)

router.post('/handicrafts/:id/delete', isLoggedIn, isVerified, users.removeHandicraftFromWishlist)

router.post('/others/:id/delete', isLoggedIn, isVerified, users.removeItemFromWishlist)

module.exports = router;
