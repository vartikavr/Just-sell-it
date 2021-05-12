const express = require('express');
const router = express.Router();
const Others = require('../schemas/othersCat');
const other = require('../controllers/others');

const { isLoggedIn, isVerified, isProductOwner, isProductOwnerOrAdmin } = require('../middleware');

router.get('/', isLoggedIn, isVerified, other.getItems)

router.get('/:id', isLoggedIn, isVerified, other.specificItem)

router.post('/new', isLoggedIn, isVerified, other.newItem)

router.post('/:id/edit', isLoggedIn, isVerified, isProductOwner, other.editItem)

router.post('/:id/delete', isLoggedIn, isVerified, isProductOwnerOrAdmin, other.deleteItem)

module.exports = router;