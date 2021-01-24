'use strict'

const Record = require('../models/Record')
const aggregateTopRecords = require('../aggregations/aggregateTopRecords')
const aggregateNewRecords = require('../aggregations/aggregateNewRecords')
const aggregateRecentRecords = require('../aggregations/aggregateRecentRecords')
const sortings = require('../constants/sortings')
const constants = require('../constants/browsers')

const get = async (ids, sorting, type, range, limit, dateDetails) => {

	const aggregation = (() => {

		if (type === constants.BROWSERS_TYPE_NO_VERSION) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'browserName' ], range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'browserName' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'browserName' ], limit)
		}
		if (type === constants.BROWSERS_TYPE_WITH_VERSION) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'browserName', 'browserVersion' ], range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'browserName', 'browserVersion' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'browserName', 'browserVersion' ], limit)
		}

	})()

	const enhanceId = (id) => {

		if (type === constants.BROWSERS_TYPE_NO_VERSION) return `${ id.browserName }`
		if (type === constants.BROWSERS_TYPE_WITH_VERSION) return `${ id.browserName } ${ id.browserVersion }`

	}

	const enhance = (entries) => {

		return entries.map((entry) => ({
			id: enhanceId(entry._id),
			count: entry.count,
			created: entry.created
		}))

	}

	return enhance(
		await Record.aggregate(aggregation)
	)

}

module.exports = {
	get
}