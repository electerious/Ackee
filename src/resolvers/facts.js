'use strict'

const facts = require('../database/facts')
const pipe = require('../utils/pipe')
const requireAuth = require('../middlewares/requireAuth')

module.exports = {
	Facts: {
		activeVisitors: pipe(requireAuth, async (domain) => {

			return facts.getActiveVisitors(domain.id)

		})
	}
}