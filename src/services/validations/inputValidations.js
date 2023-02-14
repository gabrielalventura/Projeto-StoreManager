const { idSchema } = require('./schema');

const idValidate = (id) => {
  const { error } = idSchema.validate(id);

  if (error) return { type: 'INVALID_VALUE', message: 'id invalido' };

  return { type: null, message: '' };
};

module.exports = {
  idValidate,
};
