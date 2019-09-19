'use strict'

require('dotenv').config()

const mongoose = require('mongoose')
const server = require('./server')
const signale = require('./utils/signale')

const port = process.env.ACKEE_PORT || 3000
const url = `http://localhost:${ port }`

mongoose.set('useFindAndModify', false)

server.on('listening', () => signale.watch(`Listening on ${ url }`))
server.on('error', (err) => signale.fatal(err))

signale.await(`Connecting to ${ process.env.ACKEE_MONGODB }`)


mongoose.connect(process.env.ACKEE_MONGODB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	reconnectTries: Number.MAX_VALUE,
	reconnectInterval: 1000
}).then(() => {

	signale.success(`Connected to ${ process.env.ACKEE_MONGODB }`)
	signale.start(`Starting the server`)
	server.listen(port)
}).catch((err) => {
	signale.fatal(err)
	process.exit(1)

})