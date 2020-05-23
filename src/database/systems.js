'use strict'

const Record = require('../schemas/Record')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const constants = require('../constants/systems')

const getTopWithVersion = async (id, range) => {

	return Record.aggregate(
		aggregateTopFields(id, [ 'osName', 'osVersion' ], range)
	)
}

const getRecentWithVersion = async (id) => {

	return Record.aggregate(
		aggregateRecentFields(id, [ 'osName', 'osVersion' ])
	)
}

const getTopNoVersion = async (id, range) => {

	return Record.aggregate(
		aggregateTopFields(id, [ 'osName' ], range)
	)
}

const getRecentNoVersion = async (id) => {

	return Record.aggregate(
		aggregateRecentFields(id, [ 'osName' ])
	)
}


const get = async (id, sorting, type, range) => {

	switch (sorting) {
		case constants.SYSTEMS_SORTING_TOP:
			return type === constants.SYSTEMS_TYPE_NO_VERSION ? getTopNoVersion(id, range) : getTopWithVersion(id, range)
		case constants.SYSTEMS_SORTING_RECENT:
			return type === constants.SYSTEMS_TYPE_NO_VERSION ? getRecentNoVersion(id) : getRecentWithVersion(id)
	}

}

module.exports = {
	get
}