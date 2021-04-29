const express = require('express');
const router = express.Router();
const Handicraft = require('../schemas/handicrafts');
const handicrafts = require('../controllers/handicrafts');

router.get('/', handicrafts.getHandicrafts)

router.get('/:id', handicrafts.specificHandicraft)

router.post('/new', handicrafts.newHandicraft)

router.post('/:id/edit', handicrafts.editHandicraft)

router.post('/:id/delete', handicrafts.deleteHandicraft)

module.exports = router;