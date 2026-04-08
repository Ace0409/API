const Joi = require("joi");

const employeeSchema = Joi.object({
  name: Joi.string().required(),
  position: Joi.string().required(),
  salary: Joi.number().required()
});

module.exports = employeeSchema;
