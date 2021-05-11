const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

const { isLoggedIn } = require('../middleware');

router.post('/register', users.registerUser)

router.post('/login', users.loginUser)

router.get('/user', isLoggedIn, users.userInfo)

router.post('/user/edit', isLoggedIn, users.editUserInfo)

router.get('/user/wishlist', isLoggedIn, users.viewWishlist)

router.get('/user/wishlist/books/:id/add', isLoggedIn, users.addBookToWishlist)

router.get('/user/wishlist/cycles/:id/add', isLoggedIn, users.addCycleToWishlist)

router.get('/user/wishlist/handicrafts/:id/add', isLoggedIn, users.addHandicraftToWishlist)

router.get('/user/wishlist/furniture/:id/add', isLoggedIn, users.addFurnitureToWishlist)

router.get('/user/wishlist/others/:id/add', isLoggedIn, users.addItemToWishlist)

router.post('/user/wishlist/books/:id/delete', isLoggedIn, users.removeBookFromWishlist)

router.post('/user/wishlist/cycles/:id/delete', isLoggedIn, users.removeCycleFromWishlist)

router.post('/user/wishlist/furniture/:id/delete', isLoggedIn, users.removeFurnitureFromWishlist)

router.post('/user/wishlist/handicrafts/:id/delete', isLoggedIn, users.removeHandicraftFromWishlist)

router.post('/user/wishlist/others/:id/delete', isLoggedIn, users.removeItemFromWishlist)

router.post('/user/delete', isLoggedIn, users.deleteUserInfo)

router.post('/checkPwd', isLoggedIn, users.checkPwd)

router.post('/resetQA', isLoggedIn, users.resetQA)

router.post('/forgotPwd', users.forgotPassword)

router.post('/resetPwd', users.resetPassword)

router.post('/security', users.securityQA)

router.get('/logout', isLoggedIn, users.logoutUser)

module.exports = router;
