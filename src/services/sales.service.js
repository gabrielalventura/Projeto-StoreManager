const { salesModel } = require('../models');
const schema = require('./validations/inputValidations');

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
  insertSale,
};
