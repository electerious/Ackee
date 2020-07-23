'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const sortings = require('../constants/sortings')
const createDate = require('../utils/createDate')

const get = async (ids, sorting, range, limit, dateDetails) => {

	const enhance = (entries) => {

		return entries.map((entry) => ({
			id: entry._id.siteReferrer,
			count: entry.count,
			date: createDate(dateDetails.userTimeZone, entry.created).userZonedDate
		}))

	}

	const aggregation = (() => {

		if (sorting === sortings.SORTINGS_TOP) return aggregateTopFields(ids, [ 'siteReferrer' ], range, limit, dateDetails)
		if (sorting === sortings.SORTINGS_NEW) return aggregateNewFields(ids, [ 'siteReferrer' ], limit)
		if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentFields(ids, [ 'siteReferrer' ], limit)

	})()

	return enhance(
		await Record.aggregate(aggregation)
	)

}

module.exports = {
	get
}