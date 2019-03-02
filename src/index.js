'use strict'

require('dotenv').config()

const mongoose = require('mongoose')

const server = require('./server')
const signale = require('./signale')

const port = process.env.PORT || 3000
const url = `http://localhost:${ port }`

server.on('listening', () => signale.watch(`Listening on ${ url }`))
server.on('error', (err) => signale.fatal(err))

Promise.resolve().then(() => {

	signale.start(`Starting the server`)

	server.listen(port)

	signale.await(`Connecting to ${ process.env.MONGODB }`)

	return mongoose.connect(process.env.MONGODB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		reconnectTries: Number.MAX_VALUE,
		reconnectInterval: 1000
	})

}).then(() => {

	signale.success(`Connected to ${ process.env.MONGODB }`)

}).catch((err) => {

	signale.fatal(err)
	process.exit(1)

})