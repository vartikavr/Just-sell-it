const express = require('express');
const router = express.Router();
const User = require('../schemas/user');
const users = require('../controllers/users');


router.post('/register', users.registerUser)

router.post('/login', users.loginUser)

router.post('/forgotPwd', users.forgotPassword)

router.post('/resetPwd', users.resetPassword)

router.post('/security', users.securityQA)

router.get('/logout', users.logoutUser)

module.exports = router;
