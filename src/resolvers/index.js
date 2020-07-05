'use strict'

const tokens = require('./tokens')
const records = require('./records')
const domains = require('./domains')
const facts = require('./facts')
const statistics = require('./statistics')

module.exports = {
	...tokens,
	...records,
	...domains,
	...facts,
	...statistics,
	Query: {
		...domains.Query,
		...facts.Query,
		...statistics.Query
	},
	Mutation: {
		...tokens.Mutation,
		...records.Mutation,
		...domains.Mutation
	}
}