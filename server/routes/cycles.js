const express = require('express');
const router = express.Router();
const Cycle = require('../schemas/cycles');
const cycles = require('../controllers/cycles');

const { isLoggedIn, isVerified, isCycleOwner, isCycleOwnerOrAdmin } = require('../middleware');

router.get('/', isLoggedIn, isVerified, cycles.getCycles)

router.get('/:id', isLoggedIn, isVerified, cycles.specificCycle)

router.post('/new', isLoggedIn, isVerified, cycles.newCycle)

router.post('/:id/edit', isLoggedIn, isVerified, isCycleOwner, cycles.editCycle)

router.post('/:id/delete', isLoggedIn, isVerified, isCycleOwnerOrAdmin, cycles.deleteCycle)

module.exports = router;