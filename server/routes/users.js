const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

const { isLoggedIn, isVerified } = require('../middleware');

router.post('/register', users.registerUser)

router.post('/login', users.loginUser)

router.post('/chat/:id', isLoggedIn, isVerified, users.contactSeller)

router.get('/confirmation/:token', isLoggedIn, users.confirmEmail)

router.get('/confirmation', isLoggedIn, users.sendToken)

router.get('/user', isLoggedIn, users.userInfo)

router.post('/user/edit', isLoggedIn, users.editUserInfo)

router.get('/user/wishlist', isLoggedIn, isVerified, users.viewWishlist)

router.post('/user/delete', isLoggedIn, isVerified, users.deleteUserInfo)

router.post('/checkPwd', isLoggedIn, users.checkPwd) //change security Q/A

router.post('/resetQA', isLoggedIn, users.resetQA) //change security Q/A

router.post('/forgotPwd', users.forgotPassword) //change pwd

router.post('/resetPwd', users.resetPassword) //change pwd

router.post('/security', users.securityQA) // change pwd

router.get('/logout', isLoggedIn, users.logoutUser)

module.exports = router;
