'use strict'

const Record = require('../schemas/Record')
const aggregateViews = require('../aggregations/aggregateViews')
const constants = require('../constants/views')

const getUnique = async (id, interval) => {

	return Record.aggregate(
		aggregateViews(id, true, interval)
	)

}

const getTotal = async (id, interval) => {

	return Record.aggregate(
		aggregateViews(id, false, interval)
	)

}

const get = async (id, type, interval) => {

	switch (type) {
		case constants.VIEWS_TYPE_UNIQUE: return getUnique(id, interval)
		case constants.VIEWS_TYPE_TOTAL: return getTotal(id, interval)
	}

}

module.exports = {
	get
}