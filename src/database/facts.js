'use strict'

const Record = require('../schemas/Record')
const aggregateActiveVisitors = require('../aggregations/aggregateActiveVisitors')

const getActiveVisitors = async (id) => {

	const enhance = (entries) => {
		const entry = entries[0]
		return entry == null ? 0 : entry.count
	}

	return enhance(
		await Record.aggregate(
			aggregateActiveVisitors(id)
		)
	)

}

module.exports = {
	getActiveVisitors
}