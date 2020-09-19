'use strict'

const { mergeResolvers } = require('graphql-tools')

module.exports = mergeResolvers([
	require('./tokens'),
	require('./records'),
	require('./domains'),
	require('./facts'),
	require('./statistics')
])