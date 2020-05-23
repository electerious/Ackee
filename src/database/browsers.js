'use strict'

const Record = require('../schemas/Record')
const aggregateRecentFieldsMultiple = require('../aggregations/aggregateRecentFieldsMultiple')
const aggregateTopFieldsMultiple = require('../aggregations/aggregateTopFieldsMultiple')
const constants = require('../constants/browsers')

const getTopWithVersion = async (id, range) => {

	return Record.aggregate(
		aggregateTopFieldsMultiple(id, [ 'browserName', 'browserVersion' ], range)
	)
}

const getRecentWithVersion = async (id) => {

	return Record.aggregate(
		aggregateRecentFieldsMultiple(id, [ 'browserName', 'browserVersion' ])
	)
}

const getTopNoVersion = async (id, range) => {

	return Record.aggregate(
		aggregateTopFieldsMultiple(id, [ 'browserName' ], range)
	)
}

const getRecentNoVersion = async (id) => {

	return Record.aggregate(
		aggregateRecentFieldsMultiple(id, [ 'browserName' ])
	)
}


const get = async (id, sorting, type, range) => {

	switch (sorting) {
		case constants.BROWSERS_SORTING_TOP:
			return type === constants.BROWSERS_TYPE_NO_VERSION ? getTopNoVersion(id, range) : getTopWithVersion(id, range)
		case constants.BROWSERS_SORTING_RECENT:
			return type === constants.BROWSERS_TYPE_NO_VERSION ? getRecentNoVersion(id) : getRecentWithVersion(id)
	}

}

module.exports = {
	get
}