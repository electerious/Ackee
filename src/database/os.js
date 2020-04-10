'use strict'

const Record = require('../schemas/Record')
const aggregateRecentFieldsMultiple = require('../aggregations/aggregateRecentFieldsMultiple')
const aggregateTopFieldsMultiple = require('../aggregations/aggregateTopFieldsMultiple')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const constants = require('../constants/os')

const getTopWithVersion = async (id, range) => {

	return Record.aggregate(
		aggregateTopFieldsMultiple(id, [ 'osName', 'osVersion' ], range)
	)
}

const getRecentWithVersion = async (id) => {

	return Record.aggregate(
		aggregateRecentFieldsMultiple(id, [ 'osName', 'osVersion' ])
	)
}

const getTopNoVersion = async (id, range) => {

	return Record.aggregate(
		aggregateTopFields(id, 'osName', range)
	)
}

const getRecentNoVersion = async (id) => {

	return Record.aggregate(
		aggregateRecentFields(id, 'osName')
	)
}


const get = async (id, sorting, type, range) => {

	switch (sorting) {
		case constants.OS_SORTING_TOP:
			return type === constants.OS_TYPE_NO_VERSION ? getTopNoVersion(id, range) : getTopWithVersion(id, range)
		case constants.OS_SORTING_RECENT:
			return type === constants.OS_TYPE_NO_VERSION ? getRecentNoVersion(id) : getRecentWithVersion(id)
	}

}

module.exports = {
	get
}