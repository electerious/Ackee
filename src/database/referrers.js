'use strict'

const Record = require('../models/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const sortings = require('../constants/sortings')

const get = async (ids, sorting, range, limit, dateDetails) => {

	const enhance = (entries) => {

		return entries.map((entry) => ({
			id: entry._id.siteReferrer || entry._id.source,
			count: entry.count,
			created: entry.created
		}))

	}

	const aggregation = (() => {

		if (sorting === sortings.SORTINGS_TOP) return aggregateTopFields(ids, [ 'siteReferrer', 'source' ], range, limit, dateDetails, true)
		if (sorting === sortings.SORTINGS_NEW) return aggregateNewFields(ids, [ 'siteReferrer', 'source' ], limit, true)
		if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentFields(ids, [ 'siteReferrer', 'source' ], limit, true)

	})()

	return enhance(
		await Record.aggregate(aggregation)
	)

}

module.exports = {
	get
}