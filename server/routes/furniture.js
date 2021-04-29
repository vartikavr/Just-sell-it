const express = require('express');
const router = express.Router();
const Furniture = require('../schemas/furniture');
const furniture = require('../controllers/furniture');

router.get('/', furniture.getFurniture)

router.get('/:id', furniture.specificFurniture)

router.post('/new', furniture.newFurniture)

router.post('/:id/edit', furniture.editFurniture)

router.post('/:id/delete', furniture.deleteFurniture)

module.exports = router;