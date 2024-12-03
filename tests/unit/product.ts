import * as should from 'should'
import {v4 as uuid} from 'uuid'
import * as product from '../../lib/product'
import * as history from '../../lib/history'

describe('product', function() {
	before(async function() {
		await product.clear_all()
		await history.clear_all()
	})

	context('zero products', function() {
		it('get zero products', async function() {
			const res = await product.search_all()
			should(res).be.instanceOf(Array).and.have.length(0)
		})

		it('create product', async function() {
			const prod : product.dto_product = {
				plu : uuid(),
				name : 'pen',
				q_order : 50,
				q_storage : 100
			}
			await product.create(prod)

			const res = await product.search_all()
			should(res).be.instanceOf(Array).and.have.length(1)
			should(res[0]).have.property('plu')
			should(res[0].plu).be.equal(prod.plu)
		})

		after(async function() {
			await product.clear_all()
			await history.clear_all()
		})
	})

	context('one product', function() {
		let prod : product.dto_product

		before(async function() {
			prod = {
				plu : uuid(),
				name : 'pen',
				q_order : 50,
				q_storage : 100
			}

			await product.create(prod)
		})

		it('get product by plu', async function() {
			const res = await product.search_by_plu(prod.plu)
			should(res).have.property('plu')
			should(res.plu).be.equal(prod.plu)
		})

		it('get product by wrong plu', async function() {
			try {
				should.fail(await product.search_by_plu("000"), null, "error")
			}
			catch(err) {
				should(err).be.equal("error: product doesn't exist")
			}
		})

		after(async function() {
			await product.clear_all()
			await history.clear_all()
		})
	})

	context('few products', function() {
		let prod1 : product.dto_product
		let prod2 : product.dto_product
		let prod3 : product.dto_product

		before(async function() {
			prod1 = { plu : uuid(), name : 'pen', q_order : 50, q_storage : 100 }
			prod2 = { plu : uuid(),	name : 'car', q_order : 3, q_storage : 7 }
			prod3 = { plu : uuid(), name : 'pen', q_order : 34, q_storage : 65 }

			await product.create(prod1)
			await product.create(prod2)
			await product.create(prod3)
		})

		it('get product by name', async function() {
			const res = await product.search_by_name(prod1.name)
			should(res).be.instanceOf(Array).and.have.length(2)

			should(res[0]).have.property('plu')
			should(res[0].plu).be.equal(prod1.plu)
			should(res[1]).have.property('plu')
			should(res[1].plu).be.equal(prod3.plu)
		})

		it('get product by wrong name', async function() {
			const res = await product.search_by_name("grsse")
			should(res).be.instanceOf(Array).and.have.length(0)
		})

		after(async function() {
			await product.clear_all()
			await history.clear_all()
		})
	})
})