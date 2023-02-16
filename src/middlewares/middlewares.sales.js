const validateSalesQuantity = (req, res, next) => {
  const products = req.body;

  const hasQuantity = products.every(({ quantity }) => (quantity !== undefined
    && quantity !== null));

  if (!hasQuantity) return res.status(400).json({ message: '"quantity" is required' });

  return next();
};

const validateValue = (req, res, next) => {
  const products = req.body;

  const hasValue = products.every((product) => product.quantity >= 1);

  if (hasValue === false) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  return next();
};

module.exports = {
  validateSalesQuantity,
  validateValue,
};