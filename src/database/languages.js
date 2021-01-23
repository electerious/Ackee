'use strict'

const Record = require('../models/Record')
const aggregateTopRecords = require('../aggregations/aggregateTopRecords')
const aggregateNewRecords = require('../aggregations/aggregateNewRecords')
const aggregateRecentRecords = require('../aggregations/aggregateRecentRecords')
const sortings = require('../constants/sortings')
const languageCodes = require('../utils/languageCodes')

const get = async (ids, sorting, range, limit, dateDetails) => {

	const aggregation = (() => {

		if (sorting === sortings.SORTINGS_TOP) return aggregateTopRecords(ids, [ 'siteLanguage' ], range, limit, dateDetails)
		if (sorting === sortings.SORTINGS_NEW) return aggregateNewRecords(ids, [ 'siteLanguage' ], limit)
		if (sorting === sortings.SORTINGS_RECENT) return aggregateRecentRecords(ids, [ 'siteLanguage' ], limit)

	})()

	const enhance = (entries) => {

		return entries.map((entry) => ({
			id: languageCodes[entry._id.siteLanguage] || entry._id.siteLanguage,
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