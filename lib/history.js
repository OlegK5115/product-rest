const { exec } = require('./db')

const tablename = 'history'

let init_check = false

function parse_to_history(res) {
	if (!res) { throw("error: can't parse responce to history") }
	
	const history = {
		uuid : res.uuid,
		plu : res.plu,
		action : res.action,
		date : res.date,
		shop_id : res.shop_id
	}

	return history
}

async function init() {
	const req = `create table if not exists ${tablename}(
		id serial primary key,
		uuid varchar not null unique,
		plu varchar not null,
		action varchar not null,
		date date not null,
		shop_id varchar
	);`

	await exec(req)
	init_check = true
}

async function create(object) {
	if (!init_check) { await init() }
	
	const req = `insert into ${tablename} (uuid, plu, action, date, shop_id)
	values (\'${object.uuid}\', \'${object.plu}\', \'${object.action}\',
	\'${object.date}\', \'${object.shop_id}\');`

	await exec(req)
}

async function search_by_plu(plu) {
	if (!init_check) { await init() }

	const req = `select * from ${tablename} where plu = \'${plu}\';`

	return (await exec(req)).map((res) => parse_to_history(res))
}

async function search_by_action(action) {
	if (!init_check) { await init() }

	const req = `select * from ${tablename} where action = \'${action}\';`

	return (await exec(req)).map((res) => parse_to_history(res))
}

async function search_by_date(left, right) {
	if (!init_check) { await init() }

	const req = `select * from ${tablename} 
	where date >= \'${left}\' and date <= \'${right}\';`

	return (await exec(req)).map((res) => parse_to_history(res))
}

async function search_by_shop_id(shop_id) {
	if (!init_check) { await init() }

	const req = `select * from ${tablename}	where shop_id = \'${shop_id}\';`

	return (await exec(req)).map((res) => parse_to_history(res))
}

async function search_all() {
	if (!init_check) { await init() }

	const req = `select * from ${tablename};`

	return (await exec(req)).map(
		(res) => parse_to_history(res)
	)
}

async function clear_all() {
	if (!init_check) { await init() }

	const req = `delete from ${tablename};`
	
	await exec(req)
}

module.exports = {
	init,
	create,
	search_by_plu,
	search_by_action,
	search_by_date,
	search_by_shop_id,
	search_all,
	clear_all
}