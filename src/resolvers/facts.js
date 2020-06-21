'use strict'

const facts = require('../database/facts')

module.exports = {
	Facts: {
		// TODO: Add enhancer
		activeVisitors: async (domain) => {

			const entities = await facts.getViewsActive(domain.id)
			const entity = entities[0]

			return entity == null ? 0 : entity.count

		}
	}
}