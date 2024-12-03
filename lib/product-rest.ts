import {v4 as uuid} from 'uuid'

import * as prod_s from './product'
import * as history from './history'
import { exec } from './db'

const tablename : string = 'rest'

export interface dto_rest {
	plu : string,
	q_order : number,
	q_storage : number,
	shop_id : string
}

let init_check : boolean = false

function parse_to_rest(res : any) : dto_rest {
	if (!res) { throw("error: rest doesn't exist") }
	
	const rest : dto_rest = {
		plu : res.plu,
		q_order : parseInt(res.q_order),
		q_storage : parseInt(res.q_storage),
		shop_id : res.shop_id
	}

	return rest
}

export async function init() : Promise<void> {
	const req = `create table if not exists ${tablename}(
		id serial primary key,
		plu varchar not null unique,
		q_order integer not null,
		q_storage integer not null,
		shop_id varchar not null,
		foreign key(plu) references product(plu)
	);`

	await exec(req)
	init_check = true
}

export async function create(rest : dto_rest) : Promise<void> {
	if (!init_check) { await init() }

	const product : prod_s.dto_product = await prod_s.search_by_plu(rest.plu)
	if (product.q_order < rest.q_order) {
		throw("error: rest is too large")
	}

	const req = `insert into ${tablename} (plu, q_order, q_storage, shop_id) 
	values (\'${rest.plu}\', ${rest.q_order}, ${rest.q_storage},
	\'${rest.shop_id}\');`

	await exec(req)
	await history.create({
		uuid : uuid(),
		plu : rest.plu,
		action : 'create_rest',
		date : new Date().toDateString(),
		shop_id : rest.shop_id
	})
}

export async function increase(plu : string, number : number) : Promise<void> {
	if (!init_check) { await init() }
	
	const product : prod_s.dto_product = await prod_s.search_by_plu(plu)
	const rest : dto_rest = await search_by_plu(plu)
	if (!rest) { throw("rest doesn't exists")}
	
	const new_q_order : number = number + rest.q_order
	if (product.q_order < new_q_order) {
		throw("error: rest is too large")
	}

	const req = `update ${tablename} set q_order = ${new_q_order} 
	where plu = \'${plu}\';`

	await exec(req)
	await history.create({
		uuid : uuid(),
		plu : plu,
		action : 'increase_rest',
		date : new Date().toDateString(),
		shop_id : rest.shop_id
	})
}

export async function decrease(plu : string, number : number) : Promise<void> {
	if (!init_check) { await init() }

	const rest : dto_rest = await search_by_plu(plu)
	if (!rest) { throw("rest doesn't exists")}

	const new_q_order : number = rest.q_order - number
	if (new_q_order < 0) {
		throw("error: rest is too small")
	}

	const req = `update ${tablename} set q_order = ${new_q_order} 
	where plu = \'${plu}\';`

	await exec(req)
	await history.create({
		uuid : uuid(),
		plu : plu,
		action : 'decrease_rest',
		date : new Date().toDateString(),
		shop_id : rest.shop_id
	})
}

export async function search_by_plu(plu : string) : Promise<dto_rest> {
	if (!init_check) { await init() }

	const req = `select * from ${tablename} where plu = \'${plu}\';`

	const result : dto_rest = parse_to_rest((await exec(req))[0])
	
	await history.create({
		uuid : uuid(),
		plu : plu,
		action : 'search_rest_by_plu',
		date : new Date().toDateString(),
		shop_id : result.shop_id
	})

	return result
}

export async function search_by_shop_id(shop_id : string) : Promise<dto_rest[]>
{
	if (!init_check) { await init() }

	const req = `select * from ${tablename}
	where shop_id = \'${shop_id}\';`

	const result : dto_rest[] = (await exec(req)).map(
		(res : any) => parse_to_rest(res)
	)
	await history.create({
		uuid : uuid(),
		plu : null,
		action : 'search_rest_by_shop_id',
		date : new Date().toDateString(),
		shop_id : shop_id
	})

	return result
}

export async function search_by_order(left : number, right : number) : Promise<dto_rest[]>
{
	if (!init_check) { await init() }

	const req = `select * from ${tablename} 
	where q_order >= ${left} and q_order <= ${right};`

	const result : dto_rest[] = (await exec(req)).map(
		(res : any) => parse_to_rest(res)
	)
	await history.create({
		uuid : uuid(),
		plu : null,
		action : 'search_rest_by_order',
		date : new Date().toDateString(),
		shop_id : null
	})

	return result
}

export async function search_by_storage(left : number, right : number) : Promise<dto_rest[]> 
{
	if (!init_check) { await init() }

	const req = `select * from ${tablename}
	where q_storage >= ${left} and q_storage <= ${right};`

	const result : dto_rest[] = (await exec(req)).map(
		(res : any) => parse_to_rest(res)
	)
	await history.create({
		uuid : uuid(),
		plu : null,
		action : 'search_rest_by_storage',
		date : new Date().toDateString(),
		shop_id : null
	})

	return result
}

export async function search_all() : Promise<dto_rest[]> {
	if (!init_check) { await init() }

	const req = `select * from ${tablename};`
	
	const result : dto_rest[] = (await exec(req)).map(
		(res : any) => parse_to_rest(res)
	)
	await history.create({
		uuid : uuid(),
		plu : null,
		action : 'search_all_rests',
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