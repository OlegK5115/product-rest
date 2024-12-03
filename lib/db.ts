import { Pool } from 'pg'
import { postgres } from 'config'

const pool = new Pool({
	user : postgres.user,
	password : postgres.password,
	host : postgres.host,
	port : postgres.port,
	database : postgres.database
})

export async function exec(req : string) : Promise<any> {
	return (await pool.query(req)).rows
}