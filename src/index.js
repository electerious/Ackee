#!/usr/bin/env node
'use strict'
require('dotenv').config()

const server = require('./server')
const signale = require('./utils/signale')
const connect = require('./utils/connect')
const isDemoMode = require('./utils/isDemoMode')
const isDevelopmentMode = require('./utils/isDevelopmentMode')
const fillDatabase = require('./utils/fillDatabase')
const stripUrlAuth = require('./utils/stripUrlAuth')

const port = process.env.ACKEE_PORT || process.env.PORT || 3000
const dbUrl = process.env.ACKEE_MONGODB || process.env.MONGODB_URI
const serverUrl = `http://localhost:${ port }`

if (dbUrl == null) {
	signale.fatal('MongoDB connection URI missing in environment')
	process.exit(1)
}

server.on('listening', () => signale.watch(`Listening on ${ serverUrl }`))
server.on('error', (err) => signale.fatal(err))

signale.await(`Connecting to ${ stripUrlAuth(dbUrl) }`)

connect(dbUrl).then(() => {

	signale.success(`Connected to ${ stripUrlAuth(dbUrl) }`)
	signale.start(`Starting the server`)

	server.listen(port)

	if (isDevelopmentMode === true) {

		signale.info('Development mode enabled')

	}

	if (isDemoMode === true) {

		const job = fillDatabase(serverUrl)
		const date = job.nextInvocation()

		const formattedDate = `${ date.getDate() }.${ date.getMonth() }.${ date.getFullYear() }`
		const formattedTime = `${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() }`

		signale.info('Demo mode enabled')
		signale.info('New records will be added minutely')
		signale.info(`Next record fill on ${ formattedDate } at ${ formattedTime } o'clock`)

	}

}).catch((err) => {

	signale.fatal(err)
	process.exit(1)

})