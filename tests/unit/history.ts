import * as should from 'should'
import {v4 as uuid} from 'uuid'
import * as history from '../../lib/history'

describe('history', function() {
	before(async function() {
		await history.clear_all()
	})

	context('zero histories', function() {
		it('get zero histories', async function() {
			const res = await history.search_all()
			should(res).be.instanceOf(Array).and.have.length(0)
		})

		it('create history', async function() {
			let hstory = {
				uuid : uuid(),
				plu : null,
				action : 'search all products',
				date : new Date().toDateString(),
				shop_id : null
			}

			await history.create(hstory)

			const res = await history.search_all()
			should(res).be.instanceOf(Array).and.have.length(1)
		})

		after(async function() {
			await history.clear_all()
		})
	})

	context('one history', function() {
		let hstory

		before(async function() {
			hstory = {
				uuid : uuid(),
				plu : "plu1",
				action : 'search all products',
				date : new Date().toDateString(),
				shop_id : "shop1"
			}

			await history.create(hstory)
		})

		it('search by action', async function() {
			const res = await history.search_by_action(hstory.action)
			should(res).be.instanceOf(Array).and.have.length(1)

			should(res[0]).have.property('uuid')
			should(res[0].uuid).be.equal(hstory.uuid)
		})

		it('search by plu', async function() {
			const res = await history.search_by_plu(hstory.plu)
			should(res).be.instanceOf(Array).and.have.length(1)

			should(res[0]).have.property('uuid')
			should(res[0].uuid).be.equal(hstory.uuid)
		})

		it('search by shop_id', async function() {
			const res = await history.search_by_shop_id(hstory.shop_id)
			should(res).be.instanceOf(Array).and.have.length(1)

			should(res[0]).have.property('uuid')
			should(res[0].uuid).be.equal(hstory.uuid)
		})

		it('search by date', async function() {
			const date1 = new Date("2023-12-31T18:59:59.999").toDateString()
			const date2 = new Date("2025-12-31T18:59:59.999").toDateString()

			const res = await history.search_by_date(date1, date2)
			should(res).be.instanceOf(Array).and.have.length(1)

			should(res[0]).have.property('uuid')
			should(res[0].uuid).be.equal(hstory.uuid)
		})

		after(async function() {
			await history.clear_all()
		})
	})
})