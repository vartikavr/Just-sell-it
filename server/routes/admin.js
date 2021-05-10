const express = require('express');
const router = express.Router();
const admin = require('../controllers/admin');

const { isLoggedIn, isAdmin } = require('../middleware');

router.post('/register', admin.registerAdmin)

router.post('/:id/products', isLoggedIn, isAdmin, admin.viewUserProducts)

router.post('/user-profile/:id', isLoggedIn, isAdmin, admin.viewUserProfile)

router.get('/users', isLoggedIn, isAdmin, admin.getAllUsers)

router.post('/:id/delete', isLoggedIn, isAdmin, admin.deleteUser)

module.exports = router;
