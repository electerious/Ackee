'use strict'

const { mergeTypeDefs } = require('graphql-tools')

module.exports = mergeTypeDefs([
	require('./tokens'),
	require('./permanentTokens'),
	require('./records'),
	require('./domains'),
	require('./events'),
	require('./actions'),
	require('./facts'),
	require('./miscellaneous'),
	require('./domainStatistics'),
	require('./eventStatistics')
], { all: true })