import { db } from "../database/database.connection.js"

export async function gamesList(req, res) {
  try {
    const games = await db.query("SELECT * FROM games")

    res.send(games.rows)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function gameInsert(req, res) {
  try {
    const {name, image, stockTotal, pricePerDay} = req.body

    const haveGame = await db.query(`SELECT * FROM games WHERE name = '${name}'`)

    if (haveGame.rowCount !== 0) return res.status(409).send('Esse nome de jogo já existe')

    await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ('${name}', '${image}', '${stockTotal}', '${pricePerDay}')`)

    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message)
  }
}