import Joi from "joi"

export const createRentalModel = Joi.object({
  customerId: Joi.number(),
  gameId: Joi.number(),
  daysRented: Joi.number().min(1)
})