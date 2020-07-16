'use strict'

const Record = require('../schemas/Record')
const aggregateActiveVisitors = require('../aggregations/aggregateActiveVisitors')

const getActiveVisitors = async (ids) => {

	const enhance = (entries) => {
		const entry = entries[0]
		return entry == null ? 0 : entry.count
	}

	return enhance(
		await Record.aggregate(
			aggregateActiveVisitors(ids)
		)
	)

}

module.exports = {
	getActiveVisitors
}