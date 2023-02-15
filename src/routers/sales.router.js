const express = require('express');
const { salesController } = require('../controllers');
const { validateSalesQuantity } = require('../middlewares/middlewares.sales');
const { validateId } = require('../middlewares/middleware.product');

const router = express.Router();

router.post('/', validateSalesQuantity, validateId, salesController.insertSale);

module.exports = router;
