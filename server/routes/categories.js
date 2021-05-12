const express = require('express');
const router = express.Router();

const categories = require('../controllers/categories');
const { isLoggedIn, isVerified } = require('../middleware');

router.get('/', isLoggedIn, categories.displayCategories)

//my-profile => products
router.get('/user/books', isLoggedIn, isVerified, categories.getUserBooks)

router.get('/user/cycles', isLoggedIn, isVerified, categories.getUserCycles)

router.get('/user/furniture', isLoggedIn, isVerified, categories.getUserFurniture)

router.get('/user/handicrafts', isLoggedIn, isVerified, categories.getUserHandicrafts)

router.get('/user/others', isLoggedIn, isVerified, categories.getUserOthers)

module.exports = router;