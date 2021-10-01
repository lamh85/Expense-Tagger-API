import dotenv from 'dotenv'
import nodePostgres from 'pg'

dotenv.config()
const { Client } = nodePostgres

const { env: envValues } = process

const client = new Client({
  user: envValues.PG_USER,
  password: envValues.PG_PASSWORD,
  host: envValues.PG_HOST,
  port: envValues.PG_PORT,
  database: envValues.PG_DATABASE
})

export default client
