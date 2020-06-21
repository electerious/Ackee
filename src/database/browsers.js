'use strict'

const Record = require('../schemas/Record')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const aggregateNewFields = require('../aggregations/aggregateNewFields')
const aggregateRecentFields = require('../aggregations/aggregateRecentFields')
const sortings = require('../constants/sortings')
const constants = require('../constants/browsers')

const getTopNoVersion = async (id, range) => {

	return Record.aggregate(
		aggregateTopFields(id, [ 'browserName' ], range)
	)

}

const getNewNoVersion = async (id) => {

	return Record.aggregate(
		aggregateNewFields(id, [ 'browserName' ])
	)

}

const getRecentNoVersion = async (id) => {

	return Record.aggregate(
		aggregateRecentFields(id, [ 'browserName' ])
	)

}

const getTopWithVersion = async (id, range) => {

	return Record.aggregate(
		aggregateTopFields(id, [ 'browserName', 'browserVersion' ], range)
	)

}

const getNewWithVersion = async (id) => {

	return Record.aggregate(
		aggregateNewFields(id, [ 'browserName', 'browserVersion' ])
	)

}

const getRecentWithVersion = async (id) => {

	return Record.aggregate(
		aggregateRecentFields(id, [ 'browserName', 'browserVersion' ])
	)

}

const get = async (id, sorting, type, range) => {

	switch (sorting) {
		case sortings.SORTINGS_TOP:
			return type === constants.BROWSERS_TYPE_NO_VERSION ? getTopNoVersion(id, range) : getTopWithVersion(id, range)
		case sortings.SORTINGS_NEW:
			return type === constants.BROWSERS_TYPE_NO_VERSION ? getNewNoVersion(id) : getNewWithVersion(id)
		case sortings.SORTINGS_RECENT:
			return type === constants.BROWSERS_TYPE_NO_VERSION ? getRecentNoVersion(id) : getRecentWithVersion(id)
	}

}

module.exports = {
	get
}