'use strict'

const actions = require('../database/actions')
const pipe = require('../utils/pipe')
const requireAuth = require('../middlewares/requireAuth')

module.exports = {
	EventStatistics: {
		chart: pipe(requireAuth, async (event, { type, interval, limit }, { dateDetails }) => {

			const ids = [ event.id ]
			return actions.getChart(ids, type, interval, limit, dateDetails)

		}),
		list: pipe(requireAuth, async (event, { sorting, type, range, limit }, { dateDetails }) => {

			const ids = [ event.id ]
			return actions.getList(ids, sorting, type, range, limit, dateDetails)

		})
	}
}