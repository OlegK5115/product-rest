import * as product from '../lib/product'

export function setup(app) {
	
	app.get('/products', async (req, res) => {
		let ans : product.dto_product[] = await product.search_all()

		if (req.query["plu"]) {
			ans = ans.filter((item1) => item1.plu == req.query["plu"])
		}
		
		if (req.query["name"]) {
			const name = req.query["name"]
			const mass = await product.search_by_name(name)
			ans = ans.filter((item1) => {
				return mass.some((item2) => {
					return item1.plu == item2.plu
				})
			})
		}

		res.status(200).send(ans)
	})

	app.post('/product', async (req, res) => {
		try {
			const prod : product.dto_product = {
				plu : req.body["plu"],
				name : req.body["name"],
				q_order : parseInt(req.body["q_order"]),
				q_storage : parseInt(req.body["q_storage"])
			}

			await product.create(prod)
			
			res.send('ok')
		}
		catch(err) {
			res.status(404).send(err)
		}
	})
}