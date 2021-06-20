'use strict'

const views = require('../database/views')
const facts = require('../database/facts')
const durations = require('../database/durations')
const viewsType = require('../constants/views')
const intervals = require('../constants/intervals')
const pipe = require('../utils/pipe')
const domainIds = require('../utils/domainIds')
const recursiveId = require('../utils/recursiveId')
const requireAuth = require('../middlewares/requireAuth')

module.exports = {
	Facts: {
		id: pipe(requireAuth, async (domain) => {
			const ids = await domainIds(domain)

			// Provide a static fallback id when there're domains to create a recursive id from
			if (ids.length === 0) return '882b8e8a-f30b-414d-85e1-00d8ed5585a6'

			return recursiveId(ids)
		}),
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
		averageViewsChange: pipe(requireAuth, async (domain, _, { dateDetails }) => {
			const ids = await domainIds(domain)
			const entries = await views.get(ids, viewsType.VIEWS_TYPE_UNIQUE, intervals.INTERVALS_DAILY, 14, dateDetails)

			const totalCountPrevious = entries.slice(7, 14).reduce((acc, entry) => acc + entry.count, 0)
			const totalCountCurrent = entries.slice(0, 7).reduce((acc, entry) => acc + entry.count, 0)
			const totalDifference = totalCountCurrent - totalCountPrevious

			// No previous views, no change
			if (totalCountPrevious === 0) return

			const percentageChange = totalDifference / totalCountPrevious * 100
			return Math.min(Math.max(Math.round(percentageChange), -100), 100)
		}),
		averageDuration: pipe(requireAuth, async (domain, _, { dateDetails }) => {
			const ids = await domainIds(domain)
			const entries = await durations.get(ids, intervals.INTERVALS_DAILY, 14, dateDetails)

			const totalCount = entries.reduce((acc, entry) => acc + entry.count, 0)
			return totalCount / entries.length
		}),
		averageDurationChange: pipe(requireAuth, async (domain, _, { dateDetails }) => {
			const ids = await domainIds(domain)
			const entries = await durations.get(ids, intervals.INTERVALS_DAILY, 14, dateDetails)

			const totalCountPrevious = entries.slice(7, 14).reduce((acc, entry) => acc + entry.count, 0)
			const totalCountCurrent = entries.slice(0, 7).reduce((acc, entry) => acc + entry.count, 0)
			const totalDifference = totalCountCurrent - totalCountPrevious

			// No previous views, no change
			if (totalCountPrevious === 0) return

			const percentageChange = totalDifference / totalCountPrevious * 100
			return Math.min(Math.max(Math.round(percentageChange), -100), 100)
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
		}),
	},
	Query: {
		facts: () => ({}),
	},
}