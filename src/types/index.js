'use strict'

const { resolve } = require('path')
const { loadFilesSync, mergeTypeDefs } = require('graphql-tools')

const typesArray = loadFilesSync([
	resolve(__dirname, './domains.graphql'),
	resolve(__dirname, './facts.graphql'),
	resolve(__dirname, './miscellaneous.graphql'),
	resolve(__dirname, './records.graphql'),
	resolve(__dirname, './statistics.graphql'),
	resolve(__dirname, './tokens.graphql')
])

module.exports = mergeTypeDefs(typesArray, { all: true })