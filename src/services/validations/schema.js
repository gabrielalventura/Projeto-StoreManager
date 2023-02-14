const Joi = require('joi');

const idSchema = Joi.number().integer().required();

const addProductSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  idSchema,
  addProductSchema,
};