import * as should from 'should'
import {v4 as uuid} from 'uuid'
import * as product from '../../lib/product'
import * as product_rest from '../../lib/product-rest'
import * as history from '../../lib/history'

describe('rest', function() {
	before(async function() {
		await history.clear_all()
		await product_rest.clear_all()
		await product.clear_all()
	})

	context('zero rests', function() {
		let prod : product.dto_product

		before(async function() {
			prod = {
				plu : uuid(),
				name : 'pen',
				q_order : 5,
				q_storage : 10
			}
			await product.create(prod)
		})

		it('get zero rests', async function() {
			const res = await product_rest.search_all()
			should(res).be.instanceOf(Array).and.have.length(0)
		})

		it('create rest with wrong plu', async function() {
			try {
				const r1 : product_rest.dto_rest = {
					plu : "000",
					q_order : 3,
					q_storage : 4,
					shop_id : uuid()
				}

				should.fail(await product_rest.create(r1), null, "error")
			}
			catch(err) {
				should(err).be.equal("error: product doesn't exist")
			}
		})

		it('create rest with wrong q_order', async function() {
			try {
				const r1 : product_rest.dto_rest = {
					plu : prod.plu,
					q_order : 20,
					q_storage : 4,
					shop_id : uuid()
				}

				should.fail(await product_rest.create(r1), null, "error")
			}
			catch(err) {
				should(err).be.equal("error: rest is too large")
			}
		})

		it('create rest', async function() {
			const r1 : product_rest.dto_rest = {
				plu : prod.plu,
				q_order : 3,
				q_storage : 4,
				shop_id : uuid()
			}

			await product_rest.create(r1)

			const res = await product_rest.search_all()
			should(res).be.instanceOf(Array).and.have.length(1)
			should(res[0]).have.property('plu')
			should(res[0].plu).be.equal(r1.plu)
		})

		after(async function() {
			await history.clear_all()
			await product_rest.clear_all()
			await product.clear_all()
		})
	})

	context('one rest', function() {
		let p1 : product.dto_product
		let r1 : product_rest.dto_rest

		before(async function() {
			p1 = {plu : uuid(), name : 'pen',	q_order : 5, q_storage : 10}
			r1 = {plu : p1.plu, q_order : 3, q_storage : 4, shop_id : "shop"}

			await product.create(p1)
			await product_rest.create(r1)
		})

		it('get rest by plu', async function() {
			const res = await product_rest.search_by_plu(r1.plu)
			should(res).have.property('plu')
			should(res.plu).be.equal(r1.plu)
		})

		it('get rest by wrong plu', async function() {
			try {
				should.fail(await product_rest.search_by_plu("000"), null, "error")
			}
			catch(err) {
				should(err).be.equal("error: rest doesn't exist")
			}
		})

		it('increase rest', async function() {
			await product_rest.increase(r1.plu, 1)

			const res = await product_rest.search_by_plu(r1.plu)
			should(res).have.property('q_order')
			should(res.q_order).be.equal(r1.q_order+1)
		})

		it('increase rest by wrong number', async function() {
			try {
				should.fail(await product_rest.increase(r1.plu, 3), null, "error")
			}
			catch(err) {
				should(err).be.equal("error: rest is too large")
			}
		})

		it('decrease rest', async function() {
			await product_rest.decrease(r1.plu, 1)

			const res = await product_rest.search_by_plu(r1.plu)
			should(res).have.property('q_order')
			should(res.q_order).be.equal(r1.q_order)
		})

		it('decrease rest by wrong number', async function() {
			try {
				should.fail(await product_rest.decrease(r1.plu, 10), null, "error")
			}
			catch(err) {
				should(err).be.equal("error: rest is too small")
			}
		})

		after(async function() {
			await history.clear_all()
			await product_rest.clear_all()
			await product.clear_all()
		})
	})

	context('few rests', function() {
		let p1 : product.dto_product
		let p2 : product.dto_product
		let r1 : product_rest.dto_rest
		let r2 : product_rest.dto_rest

		before(async function() {
			p1 = { plu : uuid(), name : 'pen', q_order : 50, q_storage : 100 }
			p2 = { plu : uuid(), name : 'car', q_order : 3, q_storage : 7 }
			r1 = { plu : p1.plu, q_order : 30, q_storage : 60, shop_id : "shop1"}
			r2 = { plu : p2.plu, q_order : 1, q_storage : 2, shop_id : "shop1"}

			await product.create(p1)
			await product.create(p2)
			await product_rest.create(r1)
			await product_rest.create(r2)
		})

		it('get rests by shop_id', async function() {
			const res = await product_rest.search_by_shop_id(r1.shop_id)
			should(res).be.instanceOf(Array).and.have.length(2)

			should(res[0]).have.property('plu')
			should(res[0].plu).be.equal(r1.plu)
			should(res[1]).have.property('plu')
			should(res[1].plu).be.equal(r2.plu)
		})

		it('get zero rests by wrong shop_id', async function() {
			const res = await product_rest.search_by_shop_id("biba")
			should(res).be.instanceOf(Array).and.have.length(0)
		})

		it('get rests by q_order', async function() {
			const res = await product_rest.search_by_order(15, 100)
			should(res).be.instanceOf(Array).and.have.length(1)

			should(res[0]).have.property('plu')
			should(res[0].plu).be.equal(r1.plu)
		})

		it('get rests by q_storage', async function() {
			const res = await product_rest.search_by_storage(2, 100)
			should(res).be.instanceOf(Array).and.have.length(2)

			should(res[0]).have.property('plu')
			should(res[0].plu).be.equal(r1.plu)
			should(res[1]).have.property('plu')
			should(res[1].plu).be.equal(r2.plu)
		})

		after(async function() {
			await history.clear_all()
			await product_rest.clear_all()
			await product.clear_all()
		})
	})
})