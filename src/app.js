import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import gamesRouter from "./routes/games.routes.js";
import customersRouter from "./routes/customers.routes.js";
import rentalsRouter from "./routes/rentals.routes.js";
dotenv.config()

const server = express();
server.use(cors())
server.use(express.json())
server.use([gamesRouter, customersRouter, rentalsRouter])

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`O server está rodando na porta: ${port}`))