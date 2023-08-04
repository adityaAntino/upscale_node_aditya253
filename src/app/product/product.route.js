const router = require('express').Router()
const productController  = require('./product.controller')
const { decodeToken } = require('../user/user.middleware');

///ADD-PRODUCT
router.post('/add-product',decodeToken,productController.addProduct);

///DELETE-PRODUCT
router.delete('/delete-product',decodeToken,productController.deleteProduct);

module.exports = router;