const { salesModel } = require('../models');
const schema = require('./validations/inputValidations');

const insertSale = async (soldProduct) => {
  let error = null;
  soldProduct.map((ps) => {
    error = schema.quantityValidate(ps.quantity);
    return error;
  });

  if (error.type) return error;

  const id = await salesModel.insertSale();
  await Promise.all(soldProduct.map((sold) =>
    salesModel.insertSoldProducts(sold, id)));
  return { type: null, message: { id, soldProduct } };
};

module.exports = {
  insertSale,
};
