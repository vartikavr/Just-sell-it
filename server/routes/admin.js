const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');

const { isLoggedIn, isAdmin, isVerified } = require('../middleware');

router.post('/register', admin.registerAdmin)

router.post('/:id/products', isLoggedIn, isVerified, isAdmin, admin.viewUserProducts)

router.post('/user-profile/:id', isLoggedIn, isVerified, isAdmin, admin.viewUserProfile)

router.get('/users', isLoggedIn, isVerified, isAdmin, admin.getAllUsers)

router.post('/:id/delete', isLoggedIn, isVerified, isAdmin, admin.deleteUser)

module.exports = router;
