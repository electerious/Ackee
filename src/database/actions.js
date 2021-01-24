'use strict'

const { utcToZonedTime } = require('date-fns-tz')

const Action = require('../models/Action')
const aggregateTopActions = require('../aggregations/aggregateTopActions')
const aggregateNewActions = require('../aggregations/aggregateNewActions')
const aggregateRecentActions = require('../aggregations/aggregateRecentActions')
const aggregateActions = require('../aggregations/aggregateActions')
const sortings = require('../constants/sortings')
const intervals = require('../constants/intervals')
const createArray = require('../utils/createArray')
const matchesDate = require('../utils/matchesDate')

const response = (entry) => ({
	id: entry.id,
	key: entry.key,
	value: entry.value,
	details: entry.details,
	created: entry.created,
	updated: entry.updated
})

const add = async (data) => {

	const enhance = (entry) => {
		return entry == null ? entry : response(entry)
	}

	return enhance(
		await Action.create(data)
	)

}

const update = async (id, data) => {

	const enhance = (entry) => {
		return entry == null ? entry : response(entry)
	}

	return enhance(
		await Action.findOneAndUpdate({
			id
		}, {
			$set: {
				key: data.key,
				value: data.value,
				details: data.details,
				updated: Date.now()
			}
		}, {
			new: true
		})
	)

}

const getChart = async (ids, type, interval, limit, dateDetails) => {

	const aggregation = (() => {

		if (type === 'TOTAL') return aggregateActions(ids, false, interval, limit, dateDetails)
		if (type === 'AVERAGE') return aggregateActions(ids, true, interval, limit, dateDetails)

	})()

	const enhance = (entries) => {

		const matchDay = [ intervals.INTERVALS_DAILY ].includes(interval)
		const matchMonth = [ intervals.INTERVALS_DAILY, intervals.INTERVALS_MONTHLY ].includes(interval)
		const matchYear = [ intervals.INTERVALS_DAILY, intervals.INTERVALS_MONTHLY, intervals.INTERVALS_YEARLY ].includes(interval)

		return createArray(limit).map((_, index) => {

			const date = dateDetails.lastFnByInterval(interval)(index)

			// Database entries include the day, month and year in the
			// timezone of the user. We therefore need to match it against a
			// date in the timezone of the user.
			const userZonedDate = utcToZonedTime(date, dateDetails.userTimeZone)

			// Find a entry that matches the date
			const entry = entries.find((entry) => {
				return matchesDate(
					matchDay === true ? entry._id.day : undefined,
					matchMonth === true ? entry._id.month : undefined,
					matchYear === true ? entry._id.year : undefined,
					userZonedDate
				)
			})

			return {
				id: date,
				count: entry == null ? 0 : entry.count
			}

		})

	}

	return enhance(
		await Action.aggregate(aggregation)
	)

}

const getList = async (ids, sorting, type, range, limit, dateDetails) => {

	const enhance = (entries) => {

		return entries.map((entry) => ({
			id: entry._id.key,
			count: entry.count,
			created: entry.created
		}))

	}

	const aggregation = (() => {

		if (type === 'TOTAL') {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopActions(ids, false, range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewActions(ids, limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentActions(ids, limit)
		}
		if (type === 'AVERAGE') {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopActions(ids, true, range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewActions(ids, limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentActions(ids, limit)
		}

	})()

	return enhance(
		await Action.aggregate(aggregation)
	)

}

const del = async (eventId) => {

	return Action.deleteMany({
		eventId
	})

}

module.exports = {
	add,
	update,
	getChart,
	getList,
	del
}