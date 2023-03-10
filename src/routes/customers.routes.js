import { Router } from "express";
import { customerInsert, customersList, customerUpdate, getCustomerById } from "../controllers/customers.controllers.js";
import { validateModel } from "../middlewares/validate.middleware.js";
import { createCustomerModel } from "../models/customers.model.js";

const customersRouter = Router()

customersRouter.get('/customers', customersList)

customersRouter.get('/customers/:id', getCustomerById)

customersRouter.post('/customers', validateModel(createCustomerModel) , customerInsert)

customersRouter.put('/customers/:id', validateModel(createCustomerModel), customerUpdate)

export default customersRouter