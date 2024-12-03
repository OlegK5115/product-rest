const history = require('../lib/history')

function setup(app) {
	app.get('/histories', async (req, res) => {
		let ans = await history.search_all()

		if (req.query["plu"]) {
			ans = ans.filter((item1) => item1.plu == req.query["plu"])
		}

		if (req.query["action"]) {
			const action = req.query['action']
			const mass = await history.search_by_action(action)
			ans = ans.filter((item1) => {
				return mass.some((item2) => {
					return item1.uuid == item2.uuid
				})
			})
		}

		if (req.query["date_left"] && req.query["date_right"]) {
			const date_l = req.query["date_left"]
			const date_r = req.query["date_right"]
			const mass = await history.search_by_date(date_l, date_r)
			ans = ans.filter((item1) => {
				return mass.some((item2) => {
					return item1.uuid == item2.uuid
				})
			})
		}

		if (req.query["shop_id"]) {
			const shop_id = req.query["shop_id"]
			const mass = await history.search_by_shop_id(shop_id)
			ans = ans.filter((item1) => {
				return mass.some((item2) => {
					return item1.uuid == item2.uuid
				})
			})
		}

		res.status(200).send(ans)
	})
}

module.exports = { setup }