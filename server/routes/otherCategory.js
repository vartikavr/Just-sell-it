const express = require('express');
const router = express.Router();
const Others = require('../schemas/othersCat');
const other = require('../controllers/others');

router.get('/', other.getItems)

router.get('/:id', other.specificItem)

router.post('/new', other.newItem)

router.post('/:id/edit', other.editItem)

router.post('/:id/delete', other.deleteItem)

module.exports = router;