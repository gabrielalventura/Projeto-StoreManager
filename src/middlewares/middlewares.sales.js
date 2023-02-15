const isRequested = (field, next, value) => {
  if (field === undefined) {
    return next({
      status: 400,
      message: `"${value}" is required`,
    });
  }
};

const validateSalesQuantity = (req, _res, next) => {
  const { body } = req;
  body.map((b) => isRequested(b.quantity, next, 'quantity'));

  return next();
};

module.exports = {
  validateSalesQuantity,
};