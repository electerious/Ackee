#!/usr/bin/env node
'use strict'
require('dotenv').config()

const http = require('http')

const signale = require('./src/utils/signale')
const checkMongoDB = require('./src/utils/connect')

const port = process.env.ACKEE_PORT || process.env.PORT || 3000
const dbUrl = process.env.ACKEE_MONGODB || process.env.MONGODB_URI
const serverUrl = `http://localhost:${ port }`

if (dbUrl == null) {
	signale.fatal('MongoDB connection URI missing in environment')
	process.exit(1)
}

const checkHTTP = (url) => {
	return new Promise((resolve, reject) => {
		const req = http.request(url, (res) => {
			if (res.statusCode < 200 || res.statusCode >= 300) {
				return reject(new Error(`Status Code: ${ res.statusCode }`))
			} else {
				return resolve(`Conntected to ${ url }`)
			}
		})
		req.on('error', reject)
		req.end()
	})
}

const checkAPI = (url) => {
	return new Promise((resolve, reject) => {
		const req = http.request(url, (res) => {
			const data = []

			res.on('data', (chunk) => {
				data.push(chunk)
			})

			res.on('end', () => {
				const { status } = JSON.parse(Buffer.concat(data).toString())
				return status === 'pass' ? resolve('Apollo server OK') : reject('Apollo server unhealthy')
			})
		})
		req.on('error', reject)
		req.end()
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