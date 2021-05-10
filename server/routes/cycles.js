const express = require('express');
const router = express.Router();
const Cycle = require('../schemas/cycles');
const cycles = require('../controllers/cycles');

const { isLoggedIn, isCycleOwner, isCycleOwnerOrAdmin } = require('../middleware');

router.get('/', isLoggedIn, cycles.getCycles)

router.get('/:id', isLoggedIn, cycles.specificCycle)

router.post('/new', isLoggedIn, cycles.newCycle)

router.post('/:id/edit', isLoggedIn, isCycleOwner, cycles.editCycle)

router.post('/:id/delete', isLoggedIn, isCycleOwnerOrAdmin, cycles.deleteCycle)

module.exports = router;