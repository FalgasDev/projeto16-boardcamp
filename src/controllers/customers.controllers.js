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
    const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [Number(id)])

    if (customer.rowCount === 0) res.sendStatus(404)

    res.send(customer.rows[0])
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

export async function customerUpdate(req, res) {
  const {id} = req.params
  const {name, phone, cpf, birthday} = req.body

  try {
    const haveCpf = await db.query(`SELECT * FROM customers WHERE cpf = '${cpf}'`)

    if (haveCpf.rowCount !== 0) return res.status(409).send('Esse cpf já está cadastrado')

    await db.query(`UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5`, [name, phone, cpf, birthday, Number(id)])

    res.sendStatus(200)
  } catch (err) {
    res.status(500).send(err.message)
  }
}