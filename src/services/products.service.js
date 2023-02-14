const { productsModel } = require('../models');
const schema = require('./validations/inputValidations');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const error = schema.idValidate(id);

  if (error.type) return error;

  const product = await productsModel.findById(id);

  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  return { product };
};

module.exports = {
  findAll,
  findById,
};