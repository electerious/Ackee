'use strict'

const facts = require('../database/facts')
const pipe = require('../utils/pipe')
const requireAuth = require('../middlewares/requireAuth')
const views = require('../database/views')
const viewsType = require('../constants/views')
const durations = require('../database/durations')
const intervals = require('../constants/intervals')

module.exports = {
	Facts: {
		activeVisitors: pipe(requireAuth, async (domain) => {

			return facts.getActiveVisitors(domain.id)

		}),
		averageViews: pipe(requireAuth, async (domain) => {

			const entries = await views.get(domain.id, viewsType.VIEWS_TYPE_UNIQUE, intervals.INTERVALS_DAILY, 14)

			const totalCount = entries.reduce((acc, entry) => {
				return acc + entry.count
			}, 0)

			return totalCount / entries.length

		}),
		averageDuration: pipe(requireAuth, async (domain) => {

			const entries = await durations.get(domain.id, intervals.INTERVALS_DAILY, 14)

			const totalCount = entries.reduce((acc, entry) => {
				return acc + entry.count
			}, 0)

			return totalCount / entries.length

		}),
		viewsToday: pipe(requireAuth, async (domain) => {

			const entries = await views.get(domain.id, viewsType.VIEWS_TYPE_UNIQUE, intervals.INTERVALS_DAILY, 1)

			return entries[0].count

		}),
		viewsMonth: pipe(requireAuth, async (domain) => {

			const entries = await views.get(domain.id, viewsType.VIEWS_TYPE_UNIQUE, intervals.INTERVALS_MONTHLY, 1)

			return entries[0].count

		}),
		viewsYear: pipe(requireAuth, async (domain) => {

			const entries = await views.get(domain.id, viewsType.VIEWS_TYPE_UNIQUE, intervals.INTERVALS_YEARLY, 1)

			return entries[0].count

		})
	}
}