'use strict'

const facts = require('../database/facts')

module.exports = {
	Facts: {
		activeVisitors: async (domain) => {

			return facts.getActiveVisitors(domain.id)

		}
	}
}