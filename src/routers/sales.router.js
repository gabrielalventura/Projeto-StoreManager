const express = require('express');
const { salesController } = require('../controllers');
const { validateSalesQuantity, validateValue } = require('../middlewares/middlewares.sales');
const { validateId, validateInfo } = require('../middlewares/middleware.product');

const router = express.Router();

router.post('/', validateSalesQuantity, validateId,
  validateValue, validateInfo, salesController.createSale);

module.exports = router;
