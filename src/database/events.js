'use strict'

const Event = require('../schemas/Event')
const aggregateTopFieldsMultiple = require('../aggregations/aggregateTopFieldsMultiple')
const aggregateTopFields = require('../aggregations/aggregateTopFields')
const constants = require('../constants/events')

const add = async (data) => {

	return Event.create(data)

}

const getCategories = async (id, range) => {

	return Event.aggregate(
		aggregateTopFields(id, 'category', range)
	)

}

const getActions = async (id, range) => {

	return Event.aggregate(
		aggregateTopFields(id, 'action', range)
	)

}

const getAll = async (id, range) => {

	return Event.aggregate(
		aggregateTopFieldsMultiple(id, [ 'category', 'action' ], range)
	)

}


const get = async (id, type, range) => {

	switch (type) {
		case constants.EVENTS_TYPE_ACTIONS:
			return getActions(id, range)
		case constants.EVENTS_TYPE_CATEGORIES:
			return getCategories(id, range)
		case constants.EVENTS_TYPE_COMBINED:
			return getAll(id, range)
	}

}

module.exports = {
	add,
	get
}