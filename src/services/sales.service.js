const { salesModel } = require('../models');
const schema = require('./validations/inputValidations');

const findAll = async () => {
  const products = await salesModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const error = schema.idValidate(id);

  if (error.type) return error;

  const product = await salesModel.findById(id);
  console.log('product', product);

  if (!product.length) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: product };
};

const insertSale = async (itemsSold) => {
  let error = null;
  itemsSold.map((ps) => {
    error = schema.quantityValidate(ps.quantity);
    return error;
  });

  if (error.type) return error;

  const date = new Date(); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
  const id = await salesModel.insertSale(date);
  await Promise.all(itemsSold.map((sold) =>
    salesModel.insertSoldProducts(id, sold)));
  return { type: null, message: { id, itemsSold } };
};

module.exports = {
  findAll,
  findById,
  insertSale,
};
