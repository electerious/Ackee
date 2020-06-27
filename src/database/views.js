'use strict'

const { subDays, subMonths, subYears, startOfDay, startOfMonth, startOfYear } = require('date-fns')
const Record = require('../schemas/Record')
const aggregateViews = require('../aggregations/aggregateViews')
const constants = require('../constants/views')
const intervals = require('../constants/intervals')
const createArray = require('../utils/createArray')
const matchesDate = require('../utils/matchesDate')

const subFn = (interval) => {

	switch (interval) {
		case intervals.INTERVALS_DAILY: return subDays
		case intervals.INTERVALS_MONTHLY: return subMonths
		case intervals.INTERVALS_YEARLY: return subYears
	}

}

const startFn = (interval) => {

	switch (interval) {
		case intervals.INTERVALS_DAILY: return startOfDay
		case intervals.INTERVALS_MONTHLY: return startOfMonth
		case intervals.INTERVALS_YEARLY: return startOfYear
	}

}

const get = async (id, type, interval, limit) => {

	const enhance = (entries) => {

		const matchDay = [ intervals.INTERVALS_DAILY ].includes(interval)
		const matchMonth = [ intervals.INTERVALS_DAILY, intervals.INTERVALS_MONTHLY ].includes(interval)
		const matchYear = [ intervals.INTERVALS_DAILY, intervals.INTERVALS_MONTHLY, intervals.INTERVALS_YEARLY ].includes(interval)

		const sub = subFn(interval)
		const start = startFn(interval)

		return createArray(limit).map((_, index) => {

			const date = sub(start(new Date()), index)

			// Find a view that matches the date
			const view = entries.find((entry) => {
				return matchesDate(
					matchDay === true ? entry._id.day : undefined,
					matchMonth === true ? entry._id.month : undefined,
					matchYear === true ? entry._id.year : undefined,
					date
				)
			})

			return {
				id: date,
				count: view == null ? 0 : view.count
			}

		})

	}

	const aggregation = (() => {

		if (type === constants.VIEWS_TYPE_UNIQUE) return aggregateViews(id, true, interval, limit)
		if (type === constants.VIEWS_TYPE_TOTAL) return aggregateViews(id, false, interval, limit)

	})()

	return enhance(
		await Record.aggregate(aggregation)
	)

}

module.exports = {
	get
}