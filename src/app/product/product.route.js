const router = require('express').Router()
const productController  = require('./product.controller')
const { decodeToken } = require('../user/user.middleware');

router.post('/add-product',decodeToken,productController.addProduct);

module.exports = router;