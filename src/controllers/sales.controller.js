const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const listProducts = async (_req, res) => {
  const { message } = await salesService.findAll();

  return res.status(200).json(message);
};

const listProductsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const createSale = async (req, res) => {
  const itemsSold = req.body;
  const { type, message } = await salesService.insertSale(itemsSold);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  listProducts,
  listProductsById,
  createSale,
};
