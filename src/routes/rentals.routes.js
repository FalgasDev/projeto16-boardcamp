import { Router } from "express";
import { rentalInsert, rentalsList } from "../controllers/rentals.controllers.js";
import { validateModel } from "../middlewares/validate.middleware.js";
import { createRentalModel } from "../models/rentals.model.js";

const rentalsRouter = Router()

rentalsRouter.get('/rentals', rentalsList)

rentalsRouter.post('/rentals', validateModel(createRentalModel), rentalInsert)

rentalsRouter.delete('/rentals/:id', )

export default rentalsRouter