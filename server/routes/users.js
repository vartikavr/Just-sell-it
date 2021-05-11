const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

const { isLoggedIn } = require('../middleware');

router.post('/register', users.registerUser)

router.post('/login', users.loginUser)

router.get('/user', isLoggedIn, users.userInfo)

router.post('/user/edit', isLoggedIn, users.editUserInfo)

router.get('/user/wishlist', isLoggedIn, users.viewWishlist)

router.post('/user/delete', isLoggedIn, users.deleteUserInfo)

router.post('/checkPwd', isLoggedIn, users.checkPwd)

router.post('/resetQA', isLoggedIn, users.resetQA)

router.post('/forgotPwd', users.forgotPassword)

router.post('/resetPwd', users.resetPassword)

router.post('/security', users.securityQA)

router.get('/logout', isLoggedIn, users.logoutUser)

module.exports = router;
