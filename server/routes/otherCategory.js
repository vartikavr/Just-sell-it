const express = require('express');
const router = express.Router();
const Others = require('../schemas/othersCat');
const other = require('../controllers/others');

const { isLoggedIn, isProductOwner, isProductOwnerOrAdmin } = require('../middleware');

router.get('/', isLoggedIn, other.getItems)

router.get('/:id', isLoggedIn, other.specificItem)

router.post('/new', isLoggedIn, other.newItem)

router.post('/:id/edit', isLoggedIn, isProductOwner, other.editItem)

router.post('/:id/delete', isLoggedIn, isProductOwnerOrAdmin, other.deleteItem)

module.exports = router;