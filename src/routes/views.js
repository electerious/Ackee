'use strict'

const views = require('../database/views')

const response = (entry) => ({
	type: 'view',
	data: {
		id: {
			day: entry._id.day,
			month: entry._id.month,
			year: entry._id.year
		},
		count: entry.count
	}
})

const responses = (entries) => ({
	type: 'views',
	data: entries.map(response)
})

const get = async (req) => {

	const { domainId } = req.params

	const entries = await views.get(domainId)

	return responses(entries)

}

module.exports = {
	get
}