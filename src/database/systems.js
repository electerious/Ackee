'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const sortings = require('../constants/sortings')
const constants = require('../constants/systems')

const getTopNoVersion = async (id, range) => {

	return Record.aggregate(
		aggregateTopFields(id, [ 'osName' ], range)
	)

}

const getNewNoVersion = async (id) => {

	return Record.aggregate(
		aggregateNewFields(id, [ 'osName' ])
	)

}

const getRecentNoVersion = async (id) => {

	return Record.aggregate(
		aggregateRecentFields(id, [ 'osName' ])
	)

}

const getTopWithVersion = async (id, range) => {

	return Record.aggregate(
		aggregateTopFields(id, [ 'osName', 'osVersion' ], range)
	)

}

const getNewWithVersion = async (id) => {

	return Record.aggregate(
		aggregateNewFields(id, [ 'osName', 'osVersion' ])
	)

}

const getRecentWithVersion = async (id) => {

	return Record.aggregate(
		aggregateRecentFields(id, [ 'osName', 'osVersion' ])
	)

}

const get = async (id, sorting, type, range) => {

	switch (sorting) {
		case sortings.SORTINGS_TOP:
			return type === constants.SYSTEMS_TYPE_NO_VERSION ? getTopNoVersion(id, range) : getTopWithVersion(id, range)
		case sortings.SORTINGS_NEW:
			return type === constants.SYSTEMS_TYPE_NO_VERSION ? getNewNoVersion(id, range) : getNewWithVersion(id, range)
		case sortings.SORTINGS_RECENT:
			return type === constants.SYSTEMS_TYPE_NO_VERSION ? getRecentNoVersion(id) : getRecentWithVersion(id)
	}

}

module.exports = {
	get
}