const express = require('express');
const router = express.Router();
const Furniture = require('../schemas/furniture');
const furniture = require('../controllers/furniture');

const { isLoggedIn, isFurnitureOwner, isFurnitureOwnerOrAdmin } = require('../middleware');

router.get('/', isLoggedIn, furniture.getFurniture)

router.get('/:id', isLoggedIn, furniture.specificFurniture)

router.post('/new', isLoggedIn, furniture.newFurniture)

router.post('/:id/edit', isLoggedIn, isFurnitureOwner, furniture.editFurniture)

router.post('/:id/delete', isLoggedIn, isFurnitureOwnerOrAdmin, furniture.deleteFurniture)

module.exports = router;