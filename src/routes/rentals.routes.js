import { Router } from "express";
import { rentalDelete, rentalInsert, rentalReturn, rentalsList } from "../controllers/rentals.controllers.js";
import { validateModel } from "../middlewares/validate.middleware.js";
import { createRentalModel } from "../models/rentals.model.js";

const rentalsRouter = Router()

rentalsRouter.get('/rentals', rentalsList)

rentalsRouter.post('/rentals', validateModel(createRentalModel), rentalInsert)

rentalsRouter.post('/rentals/:id/return', rentalReturn)

rentalsRouter.delete('/rentals/:id', rentalDelete)

export default rentalsRouter