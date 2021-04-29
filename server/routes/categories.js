const express = require('express');
const router = express.Router();

const categories = require('../controllers/categories');

router.post('/', categories.displayCategories)

module.exports = router;