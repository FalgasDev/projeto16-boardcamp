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

	res.sendStatus(201);
}
