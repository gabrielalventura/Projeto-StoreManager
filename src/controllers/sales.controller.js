const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const insertSale = async (req, res) => {
  const soldProducts = req.body;
  const { type, message } = await salesService.insertSale(soldProducts);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  insertSale,
};
