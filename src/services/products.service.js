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

const updateById = async (id, product) => {
  const hasProduct = await findById(id);
  if (hasProduct.type) return hasProduct;
   //  executa em cima do id passado, o service que identifica se o id existe ou não, e retorna a resposta para garantir que a modificação só ocorra em ids existentes; 

  const validateName = schema.productNameValidate(product);
  if (validateName.type) return validateName;

  const newProduct = await productsModel.updateById(id, product);

  return { type: null, message: newProduct };
};

const deleteById = async (productId) => {
  const hasProduct = await productsModel.findById(productId);

  if (!hasProduct) return { type: 404, message: 'Product not found' };

  await productsModel.deleteById(productId);

  return { type: null, message: '' };
};

// função desenvolvida com base na monitoria MSC do zero disponivel em: https://github.com/CarolinaKauark/msc-do-zero/blob/solved-exercise/src/services/person.service.js;

module.exports = {
  findAll,
  findById,
  addProduct,
  updateById,
  deleteById,
};