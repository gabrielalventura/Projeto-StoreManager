const Joi = require('joi');

const idSchema = Joi.number().integer().required();

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const soldQuantSchema = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
});

module.exports = {
  idSchema,
  addProductSchema,
  soldQuantSchema,
};
