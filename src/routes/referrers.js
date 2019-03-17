'use strict'

const referrers = require('../database/referrers')

const response = (entry) => ({
	type: 'referrer',
	data: {
		id: entry._id,
		count: entry.count
	}
})

const responses = (entries) => ({
	type: 'referrers',
	data: entries.map(response)
})

const get = async (req) => {

	const { domainId } = req.params

	const entries = await referrers.get(domainId)

	return responses(entries)

}

module.exports = {
	get
}