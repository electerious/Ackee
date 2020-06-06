'use strict'

const { startOfDay, startOfMonth, startOfYear } = require('date-fns')

const intervals = require('../constants/intervals')
const matchDomainId = require('../stages/matchDomainId')

module.exports = (id, unique, interval) => {

	const aggregation = [
		matchDomainId(id),
		{
			$count: 'count'
		}
	]

	if (unique === true) aggregation[0].$match.clientId = {
		$exists: true,
		$ne: null
	}

	if (interval === intervals.INTERVALS_DAILY) {
		aggregation[0].$match.created = {
			$gt: startOfDay(new Date())
		}
	}

	if (interval === intervals.INTERVALS_MONTHLY) {
		aggregation[0].$match.created = {
			$gt: startOfMonth(new Date())
		}
	}

	if (interval === intervals.INTERVALS_YEARLY) {
		aggregation[0].$match.created = {
			$gt: startOfYear(new Date())
		}
	}

	return aggregation

}