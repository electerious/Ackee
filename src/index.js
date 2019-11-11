'use strict'

require('dotenv').config()

const mongoose = require('mongoose')
const server = require('./server')
const signale = require('./utils/signale')
const isDemo = require('./utils/isDemo')
const fillDatabase = require('./utils/fillDatabase')
const stripUrlAuth = require('./utils/stripUrlAuth')

const port = process.env.ACKEE_PORT || 3000
const dbUrl = process.env.ACKEE_MONGODB
const serverUrl = `http://localhost:${ port }`

mongoose.set('useFindAndModify', false)

server.on('listening', () => signale.watch(`Listening on ${ serverUrl }`))
server.on('error', (err) => signale.fatal(err))

if (dbUrl == null) {
	signale.fatal('MongoDB connection URI missing in environment')
	process.exit(1)
}

signale.await(`Connecting to ${ stripUrlAuth(dbUrl) }`)

mongoose.connect(dbUrl, {

	// mongoose.connect(process.env.ACKEE_MONGODB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	reconnectTries: Number.MAX_VALUE,
	reconnectInterval: 1000
}).then(() => {

	signale.success(`Connected to ${ stripUrlAuth(dbUrl) }`)
	signale.start(`Starting the server`)
	server.listen(port)

	if (isDemo === true) {

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