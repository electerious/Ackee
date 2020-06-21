'use strict'

const Record = require('../schemas/Record')
const aggregateViews = require('../aggregations/aggregateViews')
const constants = require('../constants/views')

const get = async (id, type, interval) => {

	const aggregation = (() => {
		if (type === constants.VIEWS_TYPE_UNIQUE) return aggregateViews(id, true, interval)
		if (type === constants.VIEWS_TYPE_TOTAL) return aggregateViews(id, false, interval)
	})()

	return Record.aggregate(aggregation)

}

module.exports = {
	get
}