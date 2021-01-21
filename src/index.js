#!/usr/bin/env node
'use strict'
require('dotenv').config()

const server = require('./server')
const signale = require('./utils/signale')
const config = require('./utils/config')
const connect = require('./utils/connect')
const stripUrlAuth = require('./utils/stripUrlAuth')

if (config.dbUrl == null) {
	signale.fatal('MongoDB connection URI missing in environment')
	process.exit(1)
}

server.on('listening', () => signale.watch(`Listening on http://localhost:${ config.port }`))
server.on('error', (err) => signale.fatal(err))

signale.await(`Connecting to ${ stripUrlAuth(config.dbUrl) }`)

connect(config.dbUrl).then(() => {

	signale.success(`Connected to ${ stripUrlAuth(config.dbUrl) }`)
	signale.start(`Starting the server`)

	server.listen(config.port)

	if (config.isDevelopmentMode === true) {
		signale.info('Development mode enabled')
	}

	if (config.isDemoMode === true) {
		signale.info('Demo mode enabled')
	}

}).catch((err) => {

	signale.fatal(err)
	process.exit(1)

})