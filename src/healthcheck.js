#!/usr/bin/env node
'use strict'
require('dotenv').config()

const fetch = require('node-fetch')

const signale = require('./utils/signale')
const config = require('./utils/config')
const checkMongoDB = require('./utils/connect')

if (config.dbUrl == null) {
	signale.fatal('MongoDB connection URI missing in environment')
	process.exit(1)
}

const checkServer = async (url) => {
	const response = await fetch(url)

	if (response.ok === false) {
		throw new Error(`Server is unhealthy and returned with the status '${ response.status }'`)
	}
}

const checkApi = async (url) => {
	const response = await fetch(url)

	if (response.ok === false) {
		throw new Error(`API is unhealthy and returned with the status '${ response.status }'`)
	}
}

const exit = (healthy) => process.exit(healthy === true ? 0 : 1)

const check = () => Promise.all([
	checkMongoDB(config.dbUrl),
	checkServer(`http://localhost:${ config.port }`),
	checkApi(`http://localhost:${ config.port }/.well-known/apollo/server-health`),
])

const handleSuccess = () => {
	signale.success('Ackee is up and running')
	exit(true)
}

const handleFailure = (error) => {
	signale.fatal(error)
	exit(false)
}

check()
	.then(handleSuccess)
	.catch(handleFailure)