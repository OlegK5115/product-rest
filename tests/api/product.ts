import * as product from "../../lib/product"
import * as should from 'should'
import * as supertest from 'supertest'
import {v4 as uuid} from 'uuid'

describe('api', function() {
	let agent
	let app
	
	before(function() {
		app = require('../../main')
		agent = supertest.agent(app, {})
	})

	context('check post requests', function() {
		it("check '/product'", async function() {
			const result = await agent
			.post('/product')
			.send({
				plu : uuid(),
				name : 'pen',
				q_order : 50,
				q_storage : 100
			})
			.set('X-Request-With', 'XMLHttpRequest')
			.set('Content-Type', 'application/json')
			.expect(200)
			
			should(result.text).be.equal('ok')
		})

		after(async function() {
			await product.clear_all()
		})
	})

	context('check get requests', function() {
		let prod1 : product.dto_product
		
		before(async function() {
			prod1 = {
				plu : uuid(),
				name : 'pen',
				q_order : 50,
				q_storage : 100
			}

			await product.create(prod1)
		})

		it("check '/products' with params", async function() {
			const result = await agent
			.get(`/products?plu=${prod1.plu}`)
			.set('X-Request-With', 'XMLHttpRequest')
			.set('Content-Type', 'application/json')
			.expect(200)

			should(result._body).be.instanceOf(Array).and.have.length(1)
			should(result._body[0]).have.property('plu')
			should(result._body[0].plu).be.equal(prod1.plu)
		})

		after(async function() {
			await product.clear_all()
		})
	})
})