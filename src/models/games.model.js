import Joi from "joi";

export const createGameModel = Joi.object({
  name: Joi.string().invalid('').required(),
  image: Joi.string(),
  stockTotal: Joi.number().min(1),
  pricePerDay: Joi.number().min(1)
})