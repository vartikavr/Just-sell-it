const express = require('express');
const router = express.Router();
const Handicraft = require('../schemas/handicrafts');
const handicrafts = require('../controllers/handicrafts');

const { isLoggedIn, isVerified, isHandicraftOwner, isHandicraftOwnerOrAdmin } = require('../middleware');

router.get('/', isLoggedIn, isVerified, handicrafts.getHandicrafts)

router.get('/:id', isLoggedIn, isVerified, handicrafts.specificHandicraft)

router.post('/new', isLoggedIn, isVerified, handicrafts.newHandicraft)

router.post('/:id/edit', isLoggedIn, isVerified, isHandicraftOwner, handicrafts.editHandicraft)

router.post('/:id/delete', isLoggedIn, isVerified, isHandicraftOwnerOrAdmin, handicrafts.deleteHandicraft)

module.exports = router;