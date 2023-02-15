const express = require('express');
const { productsController } = require('../controllers');
const validateName = require('../middlewares/middleware.product');

const router = express.Router();

router.get('/', productsController.listProducts);

router.get('/:id', productsController.listProductsById);

router.post('/', validateName, productsController.createProduct);

module.exports = router;
