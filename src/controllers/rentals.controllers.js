import dayjs from 'dayjs';
import { db } from '../database/database.connection.js';

export async function rentalsList(req, res) {
	try {
		const Rentals = await db.query(
			`
    SELECT
      rentals.*, 
      json_build_object(
        'id', customers.id, 'name', customers.name
      ) AS customer,
      json_build_object(
        'id', games.id, 'name', games.name
      ) AS game
    FROM rentals
      JOIN customers ON rentals."customerId" = customers.id
      JOIN games ON rentals."gameId" = games.id
    `
		);

		return res.send(Rentals.rows);
	} catch (err) {
		res.status(500).send(err.message);
	}
}

export async function rentalInsert(req, res) {
	const { customerId, gameId, daysRented } = req.body;
	const rentDate = dayjs(Date.now()).format('YYYY/MM/DD');
	const game = await db.query(`SELECT * FROM games WHERE id = $1`, [gameId]);
	const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [
		customerId,
	]);
	const originalPrice = daysRented * game.rows[0].pricePerDay;

	if (customer.rowCount === 0 || game.rowCount === 0)
		return res.sendStatus(400);

	if (game.rows[0].stockTotal === 0)
		return res
			.status(400)
			.send(
				'Esse jogo não tem unidades o suficente para aluguel neste momento.'
			);

	await db.query(
		`
    INSERT INTO 
      rentals (
        "customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee"
      ) 
      VALUES (
        $1, $2, $3, $4, $5, $6, $7
      )
    `,
		[customerId, gameId, rentDate, daysRented, null, originalPrice, null]
	);

	await db.query(`UPDATE games SET "stockTotal" = $1 WHERE id = $2`, [game.rows[0].stockTotal - 1, gameId])

	res.sendStatus(201);
}

export async function rentalDelete(req, res) {
	const {id} = req.params

	const rental = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id])

	if (rental.rowCount === 0) return res.status(404).send('Esse aluguel não existe')

	if (rental.rows[0].returnDate === null) return res.status(400).send('Esse aluguel ainda não foi finalizado')

	await db.query(`DELETE FROM rentals WHERE id = $1`, [id])

	res.sendStatus(200)
}