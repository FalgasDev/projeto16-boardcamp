import { db } from "../database/database.connection.js";

export async function customersList(req, res) {
  try {
    const customers = await db.query('SELECT * FROM customers')

    res.send(customers.rows)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function getCustomerById(req, res) {
  const {id} = req.params

  try {
    const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [id])

    if (customer.rowCount === 0) res.sendStatus(404)

    res.send(customer.rows)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function customerInsert(req, res) {
  const {name, phone, cpf, birthday} = req.body

  try {
    const haveCpf = await db.query(`SELECT * FROM customers WHERE cpf = '${cpf}'`)

    if (haveCpf.rowCount !== 0) return res.status(409).send('Esse cpf já está cadastrado')

    await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ('${name}', '${phone}', '${cpf}', '${birthday}');`)

    res.sendStatus(201)
  } catch (err) {
    res.status(500).send(err.message)
  }
}