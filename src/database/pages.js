'use strict'

const Record = require('../models/Record')
const aggregateTopRecords = require('../aggregations/aggregateTopRecords')
const aggregateNewRecords = require('../aggregations/aggregateNewRecords')
const aggregateRecentRecords = require('../aggregations/aggregateRecentRecords')
const sortings = require('../constants/sortings')
const recursiveId = require('../utils/recursiveId')

const get = async (ids, sorting, range, limit, dateDetails) => {
	const aggregation = (() => {
		if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'siteLocation' ], range, limit, dateDetails)
		if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'siteLocation' ], limit)
		if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'siteLocation' ], limit)
	})()

	const enhanceId = (id) => {
		return id.siteLocation
	}

	const enhance = (entries) => {
		return entries.map((entry) => {
			const value = enhanceId(entry._id)

			return {
				id: recursiveId([ value, sorting, range, ...ids ]),
				value,
				count: entry.count,
				created: entry.created,
			}
		})
	}

	return enhance(
		await Record.aggregate(aggregation),
	)
}

module.exports = {
	get,
}