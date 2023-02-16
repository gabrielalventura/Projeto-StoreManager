const express = require('express');
const { productsController } = require('../controllers');
const { validateName } = require('../middlewares/middleware.product');

const router = express.Router();

router.get('/', productsController.listProducts);

router.post('/', validateName, productsController.createProduct);

router.get('/:id', productsController.listProductsById);

router.put('/:id', validateName,
  productsController.updateById);

module.exports = router;
