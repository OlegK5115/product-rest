import * as config from 'config'
import * as history from './api/history'
import * as product from './api/product'
import * as product_rest from './api/product-rest'
import { init as history_init } from './lib/history'
import { init as product_init } from './lib/product'
import { init as product_rest_init } from './lib/product-rest'

const express = require('express')
const app  = express()
const port = config.port || 4000

async function main() {
	try {
		app.use(express.json())
		app.listen(port, () => { console.log('start') })

		history_init()
		product_init()
		product_rest_init()

		history.setup(app)
		product.setup(app)
		product_rest.setup(app)
	
		app.use(function(req, res) {
			res.status(404).send('error: not found')
		})
	}
	catch(err) {
		console.error(err)
	}
}

main()

module.exports = app