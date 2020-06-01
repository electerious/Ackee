'use strict'

const facts = require('../database/facts')

const propWithFallback = (obj, key, fallback) => {

	if (obj == null) return fallback
	if (obj[key] == null) return fallback

	return obj[key]

}

const response = (entry) => ({
	type: 'fact',
	data: entry
})

const responses = (entries) => ({
	type: 'facts',
	data: [
		response({
			id: 'views_active',
			count: propWithFallback(entries.viewsActive[0], 'count', 0)
		}),
		response({
			id: 'views_average',
			average: propWithFallback(entries.viewsAverage[0], 'average', 0)
		}),
		response({
			id: 'durations_average',
			average: propWithFallback(entries.durationsAverage[0], 'average', 0)
		}),
		response({
			id: 'views_today',
			count: propWithFallback(entries.viewsToday[0], 'count', 0)
		}),
		response({
			id: 'views_month',
			count: propWithFallback(entries.viewsMonth[0], 'count', 0)
		}),
		response({
			id: 'views_year',
			count: propWithFallback(entries.viewsYear[0], 'count', 0)
		})
	]
})

const get = async (req) => {

	const { domainId } = req.params

	const entries = await facts.get(domainId)

	return responses(entries)

}

module.exports = {
	get
}