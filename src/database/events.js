'use strict'

const Event = require('../schemas/Event')
const aggregateTopFieldsMultiple = require('../aggregations/aggregateTopFieldsMultiple')

const add = async (data) => {

	return Event.create(data)

}

const get = async (id, range) => {

	return Event.aggregate(
		aggregateTopFieldsMultiple(id, [ 'category', 'action' ], range)
	)

}

module.exports = {
	add,
	get
}