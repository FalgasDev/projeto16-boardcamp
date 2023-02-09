import { Router } from "express";
import { gameInsert, gamesList } from "../controllers/games.controllers.js";
import { validateModel } from "../middlewares/validate.middleware.js";
import { createGameModel } from "../models/games.model.js";

const gamesRouter = Router()

gamesRouter.get('/games', gamesList)
gamesRouter.post('/games', validateModel(createGameModel), gameInsert)

export default gamesRouter