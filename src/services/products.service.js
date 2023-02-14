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
  
  return { message: product };
};

const addProduct = async (name) => {
  const error = schema.productNameValidate(name);

  if (error.type) return error;

  const newId = await productsModel.insert({ name });
  const newProduct = await productsModel.findById(newId);

  return { type: null, message: newProduct };
};

module.exports = {
  findAll,
  findById,
  addProduct,
};