import Joi from "joi";

export const createCustomerModel = Joi.object({
  name: Joi.string().invalid('').required(),
  phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(11).required(),
  cpf: Joi.string().pattern(/^[0-9]+$/).length(11).required(),
  birthday: Joi.date().required()
})