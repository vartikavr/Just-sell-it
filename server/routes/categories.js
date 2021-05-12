const express = require('express');
const router = express.Router();

const categories = require('../controllers/categories');
const { isLoggedIn } = require('../middleware');

router.post('/', isLoggedIn, categories.displayCategories)

//my-profile => products
router.get('/user/books', isLoggedIn, categories.getUserBooks)

router.get('/user/cycles', isLoggedIn, categories.getUserCycles)

router.get('/user/furniture', isLoggedIn, categories.getUserFurniture)

router.get('/user/handicrafts', isLoggedIn, categories.getUserHandicrafts)

router.get('/user/others', isLoggedIn, categories.getUserOthers)

module.exports = router;