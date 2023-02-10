import Joi from "joi";

export const createCustomerModel = Joi.object({
  name: Joi.string().invalid('').required(),
  phone: Joi.string().min(10).max(11).required(),
  cpf: Joi.string().min(11).max(11).required(),
  birthday: Joi.date().required()
})