const express = require('express');
const router = express.Router();
const Cycle = require('../schemas/cycles');
const cycles = require('../controllers/cycles');

router.get('/', cycles.getCycles)

router.get('/:id', cycles.specificCycle)

router.post('/new', cycles.newCycle)

router.post('/:id/edit', cycles.editCycle)

router.post('/:id/delete', cycles.deleteCycle)

module.exports = router;