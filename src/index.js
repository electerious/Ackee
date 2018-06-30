'use strict'

require('dotenv').config()

const mongoose = require('mongoose')

const server = require('./server')
const signale = require('./signale')

const port = process.env.PORT || 3000
const url = `http://localhost:${ port }`

signale.start(`Starting the server`)

mongoose.connect(process.env.MONGODB)
server.listen(port)

signale.watch(`Listening on ${ url }`)