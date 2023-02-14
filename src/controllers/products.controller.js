const { productsService } = require('../services');

const listProducts = async (_req, res) => {
  const { products } = await productsService.findAll();

  return res.status(200).json(products);
};

module.exports = {
  listProducts,
};