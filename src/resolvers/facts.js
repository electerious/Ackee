'use strict'

const facts = require('../database/facts')
const pipe = require('../utils/pipe')
const requireAuth = require('../middlewares/requireAuth')
const views = require('../database/views')
const viewsType = require('../constants/views')
const durations = require('../database/durations')
const domainIds = require('../utils/domainIds')
const intervals = require('../constants/intervals')

module.exports = {
	Facts: {
		activeVisitors: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const ids = await domainIds(domain)
			const activeVisitors = await facts.getActiveVisitors(ids, dateDetails)

			return activeVisitors

		}),
		averageViews: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const ids = await domainIds(domain)
			const entries = await views.get(ids, viewsType.VIEWS_TYPE_UNIQUE, intervals.INTERVALS_DAILY, 14, dateDetails)
			const totalCount = entries.reduce((acc, entry) => acc + entry.count, 0)

			return totalCount / entries.length

		}),
		averageDuration: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const ids = await domainIds(domain)
			const entries = await durations.get(ids, intervals.INTERVALS_DAILY, 14, dateDetails)
			const totalCount = entries.reduce((acc, entry) => acc + entry.count, 0)

			return totalCount / entries.length

		}),
		viewsToday: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const ids = await domainIds(domain)
			const entries = await views.get(ids, viewsType.VIEWS_TYPE_UNIQUE, intervals.INTERVALS_DAILY, 1, dateDetails)

			return entries[0].count

		}),
		viewsMonth: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const ids = await domainIds(domain)
			const entries = await views.get(ids, viewsType.VIEWS_TYPE_UNIQUE, intervals.INTERVALS_MONTHLY, 1, dateDetails)

			return entries[0].count

		}),
		viewsYear: pipe(requireAuth, async (domain, _, { dateDetails }) => {

			const ids = await domainIds(domain)
			const entries = await views.get(ids, viewsType.VIEWS_TYPE_UNIQUE, intervals.INTERVALS_YEARLY, 1, dateDetails)

			return entries[0].count

		})
	},
	Query: {
		facts: () => ({})
	}
}