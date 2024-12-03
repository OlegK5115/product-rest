import * as product_rest from "../../lib/product-rest"
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
		let p1 : product.dto_product
		let r1 : product_rest.dto_rest

		before(async function() {
			p1 = {plu : uuid(), name : 'pen',	q_order : 5, q_storage : 10}
			r1 = {plu : p1.plu, q_order : 3, q_storage : 4, shop_id : "shop"}

			await product.create(p1)
		})

		it("check '/rest'", async function() {
			const result = await agent
			.post('/rest')
			.send(r1)
			.set('X-Request-With', 'XMLHttpRequest')
			.set('Content-Type', 'application/json')
			.expect(200)
			
			should(result.text).be.equal('ok')
		})

		it("check '/rest/increase'", async function() {
			const result = await agent
			.post('/rest/increase')
			.send({plu : r1.plu, number : 1})
			.set('X-Request-With', 'XMLHttpRequest')
			.set('Content-Type', 'application/json')
			.expect(200)
			
			should(result.text).be.equal('ok')
		})

		it("check '/rest/decrease'", async function() {
			const result = await agent
			.post('/rest/decrease')
			.send({plu : r1.plu, number : 1})
			.set('X-Request-With', 'XMLHttpRequest')
			.set('Content-Type', 'application/json')
			.expect(200)
			
			should(result.text).be.equal('ok')
		})

		after(async function() {
			await product_rest.clear_all()
			await product.clear_all()
		})
	})

	context('check get requests', function() {
		let p1 : product.dto_product
		let r1 : product_rest.dto_rest

		before(async function() {
			p1 = {plu : uuid(), name : 'pen',	q_order : 5, q_storage : 10}
			r1 = {plu : p1.plu, q_order : 3, q_storage : 4, shop_id : "shop"}

			await product.create(p1)
			await product_rest.create(r1)
		})

		it("check '/rests' with params", async function() {
			const result = await agent
			.get(`/rests?plu=${r1.plu}`)
			.set('X-Request-With', 'XMLHttpRequest')
			.set('Content-Type', 'application/json')
			.expect(200)

			should(result._body).be.instanceOf(Array).and.have.length(1)
			should(result._body[0]).have.property('plu')
			should(result._body[0].plu).be.equal(r1.plu)
		})

		after(async function() {
			await product_rest.clear_all()
			await product.clear_all()
		})
	})
})