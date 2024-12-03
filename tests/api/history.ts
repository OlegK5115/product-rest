import * as history from '../../lib/history'
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

	context('check get requests', function() {
		let hstory1, hstory2, hstory3

		before(async function() {
			hstory1 = {
				uuid : uuid(),
				plu : "plu1",
				action : 'search all products',
				date : new Date().toDateString(),
				shop_id : "shop1"
			}
			hstory2 = {
				uuid : uuid(),
				plu : "plu1",
				action : 'create product',
				date : new Date().toDateString(),
				shop_id : "shop1"
			}
			hstory3 = {
				uuid : uuid(),
				plu : "plu1",
				action : 'search all products',
				date : new Date().toDateString(),
				shop_id : "shop1"
			}

			await history.create(hstory1)
			await history.create(hstory2)
			await history.create(hstory3)
		})

		it("check '/histories' with params", async function() {
			const result = await agent
			.get(`/histories?action=${hstory1.action}`)
			.set('X-Request-With', 'XMLHttpRequest')
			.set('Content-Type', 'application/json')
			.expect(200)

			should(result._body).be.instanceOf(Array).and.have.length(2)
			should(result._body[0]).have.property('uuid')
			should(result._body[0].uuid).be.equal(hstory1.uuid)
			should(result._body[1]).have.property('uuid')
			should(result._body[1].uuid).be.equal(hstory3.uuid)
		})

		after(async function() {
			await history.clear_all()
		})
	})
})