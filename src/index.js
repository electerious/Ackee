'use strict'

require('dotenv').config()

const mongoose = require('mongoose')

const server = require('./server')

mongoose.connect(process.env.MONGODB)
server.listen(process.env.PORT || 3000)