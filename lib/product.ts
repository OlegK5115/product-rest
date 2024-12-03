import {v4 as uuid} from 'uuid'

import * as history from './history'
import { exec } from './db'

const tablename : string = 'product'

export interface dto_product {
	plu : string,
	name : string,
	q_order : number,
	q_storage : number
}

let init_check : boolean = false

function parse_to_product(res : any) : dto_product {
	if (!res) {	throw("error: product doesn't exist") }
	
	const product : dto_product = {
		plu : res.plu,
		name : res.name,
		q_order : parseInt(res.q_order),
		q_storage : parseInt(res.q_storage)
	}

	return product
}

export async function init() : Promise<void> {
	const req = `create table if not exists ${tablename}(
		id serial primary key,
		plu varchar not null unique,
		name varchar not null,
		q_order integer not null,
		q_storage integer not null
	);`

	await exec(req)
	init_check = true
}

export async function create(product : dto_product) : Promise<void> {
	if (!init_check) { await init() }
	
	const req = `insert into ${tablename} (plu, name, q_order, q_storage) 
	values (\'${product.plu}\', \'${product.name}\', ${product.q_order}, 
	${product.q_storage});`

	await exec(req)
	await history.create({
		uuid : uuid(),
		plu : product.plu,
		action : 'create_product',
		date : new Date().toDateString(),
		shop_id : null
	})
}

export async function search_by_plu(plu : string) : Promise<dto_product> {
	if (!init_check) { await init() }

	const req = `select * from ${tablename}	where plu = \'${plu}\';`

	const result : dto_product = parse_to_product((await exec(req))[0])
	await history.create({
		uuid : uuid(),
		plu : plu,
		action : 'search_product_by_plu',
		date : new Date().toDateString(),
		shop_id : null
	})

	return result
}

export async function search_by_name(name : string) : Promise<dto_product[]> {
	if (!init_check) { await init() }

	const req = `select * from ${tablename}	where name = \'${name}\';`
	
	const result : dto_product[] = (await exec(req)).map(
		(res : any) => parse_to_product(res)
	)
	await history.create({
		uuid : uuid(),
		plu : null,
		action : 'search_product_by_name',
		date : new Date().toDateString(),
		shop_id : null
	})

	return result
}

export async function search_all() : Promise<dto_product[]> {
	if (!init_check) { await init() }

	const req = `select * from ${tablename};`
	
	const result : dto_product[] = (await exec(req)).map(
		(res : any) => parse_to_product(res)
	)
	await history.create({
		uuid : uuid(),
		plu : null,
		action : 'search_all_products',
		date : new Date().toDateString(),
		shop_id : null
	})

	return result
}

export async function clear_all() : Promise<void> {
	if (!init_check) { await init() }

	const req = `delete from ${tablename};`

	await exec(req)
}