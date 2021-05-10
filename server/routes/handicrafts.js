const express = require('express');
const router = express.Router();
const Handicraft = require('../schemas/handicrafts');
const handicrafts = require('../controllers/handicrafts');

const { isLoggedIn, isHandicraftOwner, isHandicraftOwnerOrAdmin } = require('../middleware');

router.get('/', isLoggedIn, handicrafts.getHandicrafts)

router.get('/:id', isLoggedIn, handicrafts.specificHandicraft)

router.post('/new', isLoggedIn, handicrafts.newHandicraft)

router.post('/:id/edit', isLoggedIn, isHandicraftOwner, handicrafts.editHandicraft)

router.post('/:id/delete', isLoggedIn, isHandicraftOwnerOrAdmin, handicrafts.deleteHandicraft)

module.exports = router;