'use strict'

const { mergeResolvers } = require('graphql-tools')

module.exports = mergeResolvers([
	require('./tokens'),
	require('./permanentTokens'),
	require('./records'),
	require('./domains'),
	require('./facts'),
	require('./statistics')
])