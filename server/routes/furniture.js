const express = require('express');
const router = express.Router();
const Furniture = require('../schemas/furniture');
const furniture = require('../controllers/furniture');

const { isLoggedIn, isVerified, isFurnitureOwner, isFurnitureOwnerOrAdmin } = require('../middleware');

router.get('/', isLoggedIn, isVerified, furniture.getFurniture)

router.get('/:id', isLoggedIn, isVerified, furniture.specificFurniture)

router.post('/new', isLoggedIn, isVerified, furniture.newFurniture)

router.post('/:id/edit', isLoggedIn, isVerified, isFurnitureOwner, furniture.editFurniture)

router.post('/:id/delete', isLoggedIn, isVerified, isFurnitureOwnerOrAdmin, furniture.deleteFurniture)

module.exports = router;