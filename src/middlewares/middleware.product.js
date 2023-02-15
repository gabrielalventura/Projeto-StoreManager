const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });

  return next();
};

const isRequested = (field, next, value) => {
  if (field === undefined) {
    return next({
      status: 400,
      message: `"${value}" is required`,
    });
  }
};

const validateId = async (req, _res, next) => {
  const { body } = req;
  body.map((b) => isRequested(b.productId, next, 'productId'));
  await Promise.all(body.map(async (b) => {
    const { type, message } = await productsService.findById(b.productId);

    if (type) return next({ status: errorMap.mapError(type), message });
  }));

  return next();
};

module.exports = {
  validateName,
  validateId,
};
