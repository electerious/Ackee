'use strict'

const Record = require('../schemas/Record')
const aggregateDailyViews = require('../aggregations/aggregateDailyViews')
const aggregateMonthlyViews = require('../aggregations/aggregateMonthlyViews')
const aggregateYearlyViews = require('../aggregations/aggregateYearlyViews')
const constants = require('../constants/views')

const getUnique = async (id, interval) => {

	switch (interval) {
		case constants.VIEWS_INTERVAL_DAILY: return Record.aggregate(
			aggregateDailyViews(id, true)
		)
		case constants.VIEWS_INTERVAL_MONTHLY: return Record.aggregate(
			aggregateMonthlyViews(id, true)
		)
		case constants.VIEWS_INTERVAL_YEARLY: return Record.aggregate(
			aggregateYearlyViews(id, true)
		)
	}

}

const getTotal = async (id, interval) => {

	switch (interval) {
		case constants.VIEWS_INTERVAL_DAILY: return Record.aggregate(
			aggregateDailyViews(id, false)
		)
		case constants.VIEWS_INTERVAL_MONTHLY: return Record.aggregate(
			aggregateMonthlyViews(id, false)
		)
		case constants.VIEWS_INTERVAL_YEARLY: return Record.aggregate(
			aggregateYearlyViews(id, false)
		)
	}

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