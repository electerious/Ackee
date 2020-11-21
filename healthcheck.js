#!/usr/bin/env node
'use strict'
require('dotenv').config()

const fetch = require('node-fetch')

const signale = require('./src/utils/signale')
const checkMongoDB = require('./src/utils/connect')

const port = process.env.ACKEE_PORT || process.env.PORT || 3000
const dbUrl = process.env.ACKEE_MONGODB || process.env.MONGODB_URI
const serverUrl = `http://localhost:${ port }`

if (dbUrl == null) {
	signale.fatal('MongoDB connection URI missing in environment')
	process.exit(1)
}

const checkHTTP = async (url) => {
	return await fetch(url)
		.then((res) => {
			if (res.status < 200 || res.status >= 300) {
				new Error(`Status Code: ${ res.status }`)
			}

			return res.text() // read the body so it can be garbage collected
		})
}

const checkAPI = async (url) => {
	return await fetch(url)
		.then((res) => res.json())
		.then(({ status }) => {
			if (status !== 'pass') {
				throw Error('Apollo server is unhealthy')
			}

			return 'Apollo server OK'
		})
}

const exit = ({ healthy = true } = {}) =>
	healthy ? process.exit(0) : process.exit(1)

const check = () => {
	return Promise.all([
		checkMongoDB(dbUrl),
		checkHTTP(serverUrl),
		checkAPI(`${ serverUrl }/.well-known/apollo/server-health`)
	])
}

const handleSuccessfulConnection = () => {
	signale.success('Healthcheck OK')
	exit({ healthy: true })
}

const handleUnsuccessfulConnection = (err) => {
	signale.fatal(err)
	exit({ healthy: false })
}

check()
	.then(handleSuccessfulConnection)
	.catch(handleUnsuccessfulConnection)