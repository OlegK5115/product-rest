import * as product_rest from '../lib/product-rest'

export function setup(app) {

	app.get('/rests', async (req, res) => {
		let ans = await product_rest.search_all()

		if (req.query["plu"]) {
			ans = ans.filter((item1) => item1.plu == req.query["plu"])
		}
		
		if (req.query["order_left"] && req.query["order_right"]) {
			const order_l = req.query["order_left"]
			const order_r = req.query["order_right"]
			const mass = await product_rest.search_by_order(order_l, order_r)
			ans = ans.filter((item1) => {
				return mass.some((item2) => {
					return item1.plu == item2.plu
				})
			})
		}

		if (req.query["storage_left"] && req.query["storage_right"]) {
			const stor_l = req.query["storage_left"]
			const stor_r = req.query["storage_right"]
			const mass = await product_rest.search_by_storage(stor_l, stor_r)
			ans = ans.filter((item1) => {
				return mass.some((item2) => {
					return item1.plu == item2.plu
				})
			})
		}
		
		if (req.query["shop_id"]) {
			const shop_id = req.query["shop_id"]
			const mass = await product_rest.search_by_shop_id(shop_id)
			ans = ans.filter((item1) => {
				return mass.some((item2) => {
					return item1.plu == item2.plu
				})
			})
		}

		res.status(200).send(ans)
	})

	app.post('/rest', async (req, res) => {
		try {
			const prod : product_rest.dto_rest = {
				plu : req.body["plu"],
				q_order : parseInt(req.body["q_order"]),
				q_storage : parseInt(req.body["q_storage"]),
				shop_id : req.body["shop_id"]
			}

			await product_rest.create(prod)
			
			res.send('ok')
		}
		catch(err) {
			res.status(404).send(err)
		}
	})

	app.post('/rest/increase', async (req, res) => {
		try {
			await product_rest.increase(
				req.body["plu"],
				parseInt(req.body["number"])
			)

			res.send('ok')
		}
		catch(err) {
			res.status(404).send(err)
		}
	})

	app.post('/rest/decrease', async (req, res) => {
		try {
			await product_rest.decrease(
				req.body["plu"],
				parseInt(req.body["number"])
			)

			res.send('ok')
		}
		catch(err) {
			res.status(404).send(err)
		}
	})
}