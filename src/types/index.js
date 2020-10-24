'use strict'

const { mergeTypeDefs } = require('graphql-tools')

module.exports = mergeTypeDefs([
	require('./domains'),
	require('./events'),
	require('./actions'),
	require('./facts'),
	require('./miscellaneous'),
	require('./records'),
	require('./statistics'),
	require('./tokens')
], { all: true })