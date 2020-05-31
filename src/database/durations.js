'use strict'

const Record = require('../schemas/Record')
const aggregateDurations = require('../aggregations/aggregateDurations')

const get = async (id, interval) => {

	return Record.aggregate(aggregateDurations(id, interval))

}

module.exports = {
	get
}