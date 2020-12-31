'use strict'

const Record = require('../models/Record')
const aggregateTopRecords = require('../aggregations/aggregateTopRecords')
const aggregateRecentRecords = require('../aggregations/aggregateRecentRecords')
const aggregateNewRecords = require('../aggregations/aggregateNewRecords')
const sortings = require('../constants/sortings')
const constants = require('../constants/referrers')

const get = async (ids, sorting, type, range, limit, dateDetails) => {

	const enhance = (entries) => {

		return entries.map((entry) => ({
			id: entry._id.siteReferrer || entry._id.source,
			count: entry.count,
			created: entry.created
		}))

	}

	const aggregation = (() => {

		if (type === constants.REFERRERS_TYPE_NO_SOURCE) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'siteReferrer' ], range, limit, dateDetails)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'siteReferrer' ], limit)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'siteReferrer' ], limit)
		}
		if (type === constants.REFERRERS_TYPE_WITH_SOURCE) {
			if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'siteReferrer', 'source' ], range, limit, dateDetails, true)
			if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'siteReferrer', 'source' ], limit, true)
			if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'siteReferrer', 'source' ], limit, true)
		}

	})()

	return enhance(
		await Record.aggregate(aggregation)
	)

}

module.exports = {
	get
}