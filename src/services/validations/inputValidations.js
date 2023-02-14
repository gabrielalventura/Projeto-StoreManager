const { idSchema, addProductSchema } = require('./schema');

const idValidate = (id) => {
  const { error } = idSchema.validate(id);

  if (error) return { type: 'INVALID_VALUE', message: 'id invalido' };

  return { type: null, message: '' };
};

const productNameValidate = (name) => {
  const { error } = addProductSchema.validate({ name });

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  idValidate,
  productNameValidate,
};
