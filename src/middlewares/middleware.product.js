const { productsModel } = require('../models');

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });

  return next();
};

const validateId = (req, res, next) => {
  const products = req.body;

  const hasProductId = products.every(({ productId }) => (productId !== undefined 
    && productId !== null));

  if (!hasProductId) return res.status(400).json({ message: '"productId" is required' });

  return next();
};

const validateInfo = async (req, res, next) => {
  const products = req.body;

  const validyId = await Promise.all(products.map(async ({ productId }) => {
    const product = await productsModel.findById(productId);
    return product;
  }));

  const validate = validyId.every((product) => product !== undefined && product !== null);

  if (!validate) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return next();
}; // função desenvolvida com auxilio da Maria Luiza Suhadolnik e código da monitora MSC do zero disponivel em: https://github.com/CarolinaKauark/msc-do-zero;

module.exports = {
  validateName,
  validateId,
  validateInfo,
};
