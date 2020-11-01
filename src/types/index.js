'use strict'

const { mergeTypeDefs } = require('graphql-tools')

module.exports = mergeTypeDefs([
	require('./domains'),
	require('./facts'),
	require('./miscellaneous'),
	require('./records'),
	require('./statistics'),
	require('./tokens'),
	require('./permanentTokens')
], { all: true })