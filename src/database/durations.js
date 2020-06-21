'use strict'

const Record = require('../schemas/Record')
const aggregateDurations = require('../aggregations/aggregateDurations')

const get = async (id, interval) => {

	const aggregation = (() => {
		return aggregateDurations(id, interval)
	})()

	return Record.aggregate(aggregation)

}

module.exports = {
	get
}